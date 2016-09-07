
<#
 * One of the best things about windows is windows powershell. Everyone is talking about it. I'm becoming a master at it
 * There are obviously many advantages of having a unix based system but truth is windows powershell is more advanced and 
 * More powerful than the unix or linux terminal.
 * This file just turns the gulp delete minified file functions into powershell functions.
#>
$paths = @{
    templates_root              = "templates/";
    index_html                  = "templates/index.html";
    js_file_path                = "static/js/*.js";
    css_file_ath                = "static/css/*.css";
    views_file_path             = "static/views/*.html";
    min_js_file_path 			      = "static/js/*.min.js";
    min_css_file_path           = "static/css/*.min.css";
    destination_jsmin_filepath 	= "static/js/site.min.js";
    destination_cssmin_filepath = "static/css/site.min.css"
}

function delete_minified_js_files {
    rm $paths.min_js_file_path
}

function delete_minified_css_files {
    rm $paths.min_css_file_path
}

<# 
  What's also super cool is that I can run gulp tasks from here as well 
  So you can now run these powershell functions in ther command line by running run_gulp_task "[gulp task name]"
  Lets say I wanted to run the gulp task I defined called delete:mincss or delete:minjs
  I would type run run_gulp_task "delete:minjs" or run_gulp_task "delete:mincss"
#>
function run_gulp_task($task_name) {
    gulp $task_name
}

<# Obviously runs the default task #>
function run_gulp_default {
    gulp
}

<#
    @param an array of gulp task names
    Iterates over each task and calls it
    In this function we just pipe the task array to the foreach cmdlet, inside the loop, the current
    Element is know as $_. Thus we can declare a variable $current_element = $_
    the function can be run like so run_all_tasks @("delete:minjs", "delete:mincss")
    It's obvious we already are doing this with gulp, its just fun to do the same thing in another way
#>
function run_all_tasks($gulp_task_args) {
    $gulp_task_args | foreach {
        gulp $_
    }
}

<# perhaps show some git information #>
function show_git_information {
  write (git config user.name)
  write (git config user.email)
}

<# Opens up a config file to edit git info like in a notepad file outside of the terminal #>
function open_git_config {
  git config --global --edit
}

<# 
  to load in these functions into your terminal from this file just open a powershell, navigate to this repo that this file is in 
  Then run . powershell_utils.ps1, this will load the paths variable and the two delete functions above
  Better yet, in powershell, variables and functions have their own drives. you can type ls variable:/ to see all the variables you have access to, same thing with ls function:/ to see all the functions available to you
  If you get any security errors when running the command . powershell_utils.ps1 
  It most likely means that you are not allowed to run powershell scripts
  To get around that you can run the command set-executionpolicy unrestricted, and make sure it worked
  By running the command get-executionpolicy .
  Once you loaded the functions in you can see them by checking the variable drive and function drive by ls variable:/ and ls function:/
  call the function like so. delete_minified_css_files when you're ready, but were just gonna stick to using gulp
  until our powershell is more convenient than using gulp
#>