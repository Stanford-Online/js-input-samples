from __future__ import division
import math

video_length = 600
durations = []
watch_times = []
total_watch_time = 0
start_time = 0
end_time = 0
grade = 0

# Adding random times to test
for i in range(0, 50):
    watch_times.append(i)

for i in range(100, 150):
    watch_times.append(i)

for i in range(400, 450):
    watch_times.append(i)

for i in range(200, 250):
    watch_times.append(i)

for i in range(300, 350):
    watch_times.append(i)


# Removing duplicates
watch_times = list(set(watch_times))

#sort the list
watch_times.sort()

# Count up the times
for j in watch_times:
    
    ind = watch_times.index(j)
    this_time = j
    next_time = watch_times[ind + 1]
    
    # If the next one is the last item, mark it as an end and we're done.
    if ind == len(watch_times) - 2:
        end_time = next_time
        durations.append(end_time - start_time)
        break
        
    # If the next time is too far ahead, call this an end and push duration
    elif next_time - this_time > 1:
        end_time = this_time
        durations.append(end_time - start_time)
        start_time = next_time
        
    # Otherwise, just keep counting up.
    else:
        pass

# Add up all the durations to get the total
total_watch_time = sum(durations)

grade = total_watch_time / video_length
# Round up to the nearest tenth.
grade = math.ceil(grade*10.0) / 10.0

print grade