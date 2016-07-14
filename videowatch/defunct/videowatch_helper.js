// The "HX-video" JSON dictionary is passed to the platform for grading and saving.
// It gets logged.
// It is defined in another file, videowatch_helper.js, and not in this file.
// That file is loaded in the parent frame.

var HXVideoWatch = {
    watch_times: [], 
    video_length: -1
};

console.log(HXVideoWatch);

$(document).ready(function(){
    // Declaring semi-global variables for later use.
    var video = $('.video');
    var currentTime;
    
    console.log('Video watcher watcher started');


    // Mark each video and set of controls with a class and anchor 
    // that will let us handle each of them separately.
    // Numbering from 1 to make things easier for course creators.
    // Right now this problem type only handles one video per page, but this may be useful later.
    video.each(function(index){   $(this).addClass('for-video-' + (index + 1));   });
    video.each(function(index){   $(this).parent().prepend('<a name="video' + (index + 1) + '"></a>');   });
    
    video.each(function(vidnumber){
        
        var thisVid = $(this);
    
        // Check to see whether the video is ready before continuing.
        var waitForVid = setInterval(function(){
            
            try {
                var state = thisVid.data('video-player-state'); // Sometimes this fails and that's ok.

                if(typeof state.videoPlayer !== 'undefined'){
                    
                    if(typeof state.videoPlayer.player.getPlayerState() !== 'undefined'){
                        console.log('video data loaded');
                        
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
                
                // Need to wait for video to play to get right duration.
                if(HXVideoWatch.video_length <= 0){
                    HXVideoWatch.video_length = state.videoPlayer.player.getDuration();
                }
            }
        }, 500);
    
    }
});