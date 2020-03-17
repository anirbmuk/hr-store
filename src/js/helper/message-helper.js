define(['ojs/ojarraydataprovider', 'ojs/ojmessages', 'ojs/ojmessage'],
function(ArrayDataProvider) {
    
    function MessageUtils() {
        
        const self = this;
        
        self.buildMessage = function(type, msgData, timeout) {
            return {
                severity: type,
                summary: msgData.msgSummary,
                detail: msgData.msgDetail,
                autoTimeout: parseInt(timeout)
            };
        };

        self.messagesDataprovider = function(messages) {
            return new ArrayDataProvider(messages);
        };
        
    }
    
    return new MessageUtils();
    
});