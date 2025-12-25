// module__notification
(function() {


    // Load modals
    if($('div').is('.module__notification')) {
        init();
    }


    // Init modals
    function init() {

        iziToast.error({
            title: 'Error',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    
        iziToast.success({
            title: 'Success',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    
        iziToast.warning({
            title: 'Worning',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    
        iziToast.info({
            title: 'Information',
            message: 'This is a test alert in two rows',
            theme: 'light',
            position: 'topRight',
            titleSize: '20',
            messageSize: '14',
            maxWidth: '360',
            icon: true,
            timeout: 100000
        });
    }

})();
