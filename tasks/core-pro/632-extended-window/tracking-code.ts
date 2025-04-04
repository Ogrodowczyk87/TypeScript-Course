if(!window.analytics) {
    window.analytics = {
        trackEvent(eventName: string) {
            console.log(`Event tracked: ${eventName}`)
        }
    }
}



window.analytics.trackEvent('submit');

