

export const mediaCheck = (blob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      
      // Read the blob as a data URL
      fileReader.onload = function(event) {
        const mediaType = blob.type.split('/')[0];
        
        if (mediaType === 'video') {
          const video = document.createElement('video');
          video.src = event.target.result;
          
          video.onloadedmetadata = function() {
            resolve({ type: 'video', duration: video.duration });
          };
  
          video.onerror = function() {
            reject(new Error('Invalid video file'));
          };
        } else if (mediaType === 'image') {
          resolve({ type: 'image' });
        } else {
          reject(new Error('Unsupported file type'));
        }
      };
  
      fileReader.onerror = function() {
        reject(new Error('Failed to read the blob'));
      };
  
      fileReader.readAsDataURL(blob);
    });
  }
  

  