// Logs a javascript object.
function logThatThing(ThatThing){

	// Log it to the console just to verify it's working
	console.log(JSON.stringify(ThatThing));
	
	// Send it to the official edX logamajig!
	Logger.log("harvardx.grape_ape.video_watch_grader", ThatThing);

}

var HXVideoWatch = {
    watch_times: [], 
    video_length: -1,
    start_time: -1
};


$(document).ready(function(){
    // Declaring semi-global variables for later use.
    var video = $('.video');
    var currentTime;
    
    console.log('Video watcher watcher started');
    
    video.each(function(vidnumber){
        
        var thisVid = $(this);
    
        // Check to see whether the video is ready before continuing.
        var waitForVid = setInterval(function(){
            
            try {
                var state = thisVid.data('video-player-state'); // Sometimes this fails and that's ok.

                if(typeof state.videoPlayer !== 'undefined'){
                    
                    if(typeof state.videoPlayer.player.getPlayerState() !== 'undefined'){
                        console.log('video data loaded');
                        HXVideoWatch.start_time = state.videoPlayer.player.getCurrentTime();
                        mainLoop(state, vidnumber);
                        clearInterval(waitForVid);
                    }
                }

            }
            catch(err){
                console.log('waiting for video ' + (vidnumber+1) + ' to be ready');
            }

            
        }, 200);
    
    });
    
    // Every half-second, push the current time to the watch_times array.
    function mainLoop(state, vidnumber){
        
        var timeChecker = setInterval(function(){
            
            // If the video is actually playing...
            if(state.videoPlayer.player.getPlayerState() === 1){
                try{
                    state.videoPlayer.update();        // Forced update of time. Required for Safari.
                }
                catch(err){
                    // If this fails, shut down this loop.
                    // It's probably because we moved to a new tab.
                    clearInterval(timeChecker);
                }
                HXVideoWatch.watch_times.push(state.videoPlayer.player.getCurrentTime());
                
                HXVideoWatch.video_length = state.videoPlayer.player.getDuration();
            }
        }, 500);
    
    }
});