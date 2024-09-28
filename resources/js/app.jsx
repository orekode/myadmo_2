import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ScrollsLayout from '@/Layouts/ScrollsLayout'
import NothingLayout from '@/Layouts/NothingLayout'


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const layouts = {
    "": NothingLayout,
    "Ads/Scrolls": ScrollsLayout,
    // "Profile": ScrollsLayout,
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]

        for(let key of Object.keys(layouts)) {
            if(name.startsWith(key) && layouts[key]){
                const Layout = layouts[key]
                page.default.layout = page => <Layout children={page} />
            }
        }

        return page
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
