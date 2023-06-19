export const state = () => ({
    defaultData: {
        appName: process.env.APP_NAME,
        appSlogan: process.env.APP_SLOGAN,
        appKeywords: process.env.APP_KEYWORDS,
        copyrightYear: process.env.COPYRIGHT_YEAR,
        facebookLink: process.env.FACEBOOK_LINK,
        twitterLink: process.env.TWITTER_LINK,
        youtubeLink: process.env.YOUTUBE_LINK,
        instagramLink: process.env.INSTAGRAM_LINK,
        pinterestLink: process.env.PINTEREST_LINK,
        metaDescription: process.env.META_DESCRIPTION,
        ogTitle: process.env.OG_TITLE,
        ogURL: process.env.OG_URL,
        ogDescription: process.env.OG_DESCRIPTION,
        ogImage: process.env.OG_IMAGE,
    },
    chatSection: true,
    connectSection: true,
    notificationSection: false
})

export const mutations = {
    SET_DEFAULT_DATA(state, data) {
        const { appName, appSlogan, appKeywords, copyrightYear, facebookLink, twitterLink, youtubeLink, instagramLink, pinterestLink, metaDescription, ogTitle, ogURL, ogDescription, ogImage } = data

        state.defaultData = {
            appName: appName || process.env.APP_NAME,
            appSlogan: appSlogan || process.env.APP_SLOGAN,
            appKeywords: appKeywords || process.env.APP_KEYWORDS,
            copyrightYear: copyrightYear || process.env.COPYRIGHT_YEAR,
            facebookLink: facebookLink || process.env.FACEBOOK_LINK,
            twitterLink: twitterLink || process.env.TWITTER_LINK,
            youtubeLink: youtubeLink || process.env.YOUTUBE_LINK,
            instagramLink: instagramLink || process.env.INSTAGRAM_LINK,
            pinterestLink: pinterestLink || process.env.PINTEREST_LINK,
            metaDescription: metaDescription || process.env.META_DESCRIPTION,
            ogTitle: ogTitle || process.env.OG_TITLE,
            ogURL: ogURL || process.env.OG_URL,
            ogDescription: ogDescription || process.env.OG_DESCRIPTION,
            ogImage: ogImage || process.env.OG_IMAGE,
        }
    },
    TOGGLE_CHAT_SECTION(state) {
        state.chatSection = !state.chatSection
    },
    TOGGLE_CONNECT_SECTION(state) {
        state.connectSection = !state.connectSection
    },
    TOGGLE_NOTIFICATION_SECTION(state) {
        state.notificationSection = !state.notificationSection
    }
}
  
export const actions = {
    // Init when page load
    init({ commit, state }, roomId) {
        this.dispatch('users/initUser', roomId)
        this.dispatch('users/setCurrentUser')
        this.dispatch('users/getActiveUsers')
        this.dispatch('users/streamUsers')
        this.dispatch('messages/getMessages', roomId)
        this.dispatch('messages/streamMessages')
        this.dispatch('files/streamFilesData')
        this.dispatch('notifications/streamNotifications')
    }
}