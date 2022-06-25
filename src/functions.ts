
interface placement {
    from: 'top' | 'bottom'
    align: 'left' | 'center' | 'right'
}

interface notify_config {
    type: 'primary'| 'info' |'success' | 'warning' | 'danger',
    message: string,
    placement?: placement
    timer?: number,
    icon?: string,

}

// export interface FunctionsModule {
//     notify: (config: notify_config) => void
// }

function notify(config: notify_config) {
    if (!config.placement) {
        config.placement = {from: 'top', align: 'center'}
    }
    if (!config.timer) {
        config.timer = 2200;
    }
    if (!config.icon) {
        switch (config.type) {
            case 'primary': config.icon = 'fa fa-check'; break;
            case 'info': config.icon = 'fa fa-info'; break;
            case 'success': config.icon = 'fa fa-check'; break;
            case 'warning': config.icon = 'fa fa-exclamation'; break;
            case 'danger': config.icon = 'fa fa-times'; break;
            default: ''; break;
        }
    }

    ($ as any).notify({
        icon: config.icon,
        message: config.message,

    }, {
        timer: 100,
        delay: config.timer,
        type: config.type,
        placement: config.placement
    });
}

export default notify;