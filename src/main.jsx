import { createRoot } from "react-dom/client";
import { Fragment } from "react";
import Router from "./routes/Router.jsx";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './assets/index.css';

createRoot(document.getElementById('root')).render(
    <Fragment>
        <Router/>
    </Fragment>
  );