const cookieStorage = {
   getItem: (key) => {
      const cookies = document.cookie.split(';').map( cookie => cookie.split('='))
         .reduce((acc, [key, value]) => ({...acc, [key.trim()]: value}), {});
      return cookies[key]
   }, 
   setItem: (key, value) => {
      document.cookie = `${key}=${value}`
   }
}

const showPopUp = function(show=false) {
   const cookiePopUp = document.querySelector('.c-cookie')
   const style = cookiePopUp.style.transform
   if(!style || show) {
      cookiePopUp.style.transform = `translate3d(${0}px, 0,0)`
   } else {
      cookiePopUp.removeAttribute('style')
   }
}

const cookieConsent = function() {
   const storageType = cookieStorage;
   const consentPropertyName = 'amasa_consent'

   const shouldShowPopup = () => !storageType.getItem(consentPropertyName)
   const saveToStorage = () => storageType.setItem(consentPropertyName, true)

   if(shouldShowPopup()) {
      showPopUp(true)
   }
   document.querySelectorAll('.select-ok, .select-privacy-policy, .policy-content-close').forEach( btn => {
      btn.onclick = e => {
         const className = e.target.className
         if(className !== 'select-ok') {
            return privacyPolicy.showPrivacyPolicy()    
         }
         saveToStorage() // Add consent true to cookie
         showPopUp()    // Close popup
         privacyPolicy.showPrivacyPolicy(true)  // Closes privacy content only if opened (true)
      }
   })
   if(window.innerWidth <= 530 ) window.onresize = () => privacyPolicy.startStyles()
}

const privacyPolicy = {
   wrapper: document.querySelector('.content-translate'),
   showPrivacyPolicy: function(close=false) {
      const transformed = this.wrapper.style.transform
      if(transformed == 'translate3d(0px, 0px, 0px)'|| close) {
         return this.wrapper.style.transform = `translate3d(0px, ${this.getHeight()}px, 0)`    // Hide Privacy  
      }
      
      privacyPolicy.wrapper.style.transform = `translate3d(0px, ${0}px, 0)`  // Show Privacy
   },
   getHeight: () => {
      return document.querySelector('.policy-content').getBoundingClientRect().height - 15
   },
   startStyles: callback => {
      const height = privacyPolicy.getHeight()
      
      privacyPolicy.wrapper.style.transform = `translate3d(0px, ${height}px, 0)`
      if(callback) setTimeout(() => callback(), 3000)
   }
}

window.onload = () => {
   privacyPolicy.startStyles(cookieConsent)
}

document.querySelector('.show-cookie').onclick = e => showPopUp()
