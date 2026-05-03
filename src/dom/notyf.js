import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; 

export const notyf = new Notyf({
    duration: 1000,
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
        type: 'warning',
        background: 'orange',
        icon: {
            className: 'material-icons',
            tagName: 'i',
            text: 'warning'
        }
        },
        {
        type: 'error',
        background: 'indianred',
        duration: 10000,
        dismissible: true
        }
    ]
    }
);