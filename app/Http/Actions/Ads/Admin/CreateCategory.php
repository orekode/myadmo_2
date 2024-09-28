<?php
namespace App\Http\Actions\Ads\Admin;


use Illuminate\Support\Facades\Log;
use App\Http\Requests\Ads\Admin\CreateCategoryRequest;
use App\Models\AdvertCategory;

class CreateCategory {

    public function handle(CreateCategoryRequest $request) {

        try {
            Log::info("recieved request to create an advert category", safeRequest($request));

            $image = $request->file("image")->store("advert/categories", "public");
         
            $category = AdvertCategory::create([
                "name"  => $request->name,
                "image" => $image,
                "parent_id" => $request->parent ?? null,
            ]);

            if($request->parent) $this->setParentPath($request->parent, $category);

            Log::info("advert created successfully", safeRequest($request));

            return successResponse([
                'message' => "Category created successfully"
            ]);
        }
        catch (\Exception $e) {
            report($e);
            return errorResponse();
        }
        
    }

    public function setParentPath($parent, AdvertCategory $category) {
        try {
            Log::info("form child category path with parent path", ["parent" => $parent, "child" => $category->id]);

            $parent = AdvertCategory::where("id", $parent)->first();

            $category->update([
                "parent_path" => ($parent->parent_id ? $parent->parent_path : "-{{$parent->id}}-" ) . "-{{$category->id}}-"
            ]);

            Log::info("hild category path formed from parent path", ["parent" => $parent->id, "child" => $category->id]);
        }
        catch (\Exception $e) {
            report($e);
            return false;
        }
    }
}
