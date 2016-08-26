<# 
    Just want to say that windows powershell is very very powerfull and its the only reason
    I like windows over unix. Windows Powershell scripting is way more advanced than unix based shell scripting.
    powershell scripting is object oriented, but we will get into that later

    Even though this doesnt make things that easier,
    It's stil cool and fun in my opinion.
    This function obviously stands for 

    @param commit parameters like -a or -am
    @param string, git comment string

    Also btw, the [String] datatype can be omitted in use cases like this
#>
function gc($git_params, [String]$commit_message) {
	git commit $git_params $commit_message
}

function gp_om {
    git push origin master
}

function run_git_commit($git_params, [String]$commit_message) {

    <# When calling a powershell passing in parameters, you dont use parentheses #>
    gc $git_params, $commit_message
    gp_om
}

<# 
    If you are using sublime text 3 for powershell scripting and want the syntax highlighting for powershell. 
    st3 doesnt come with it installed so you have to install the powershell package in package install. 
#>

<#
    One more thing. Theres a global functions drive located at function:
    So to see all the functions you have access to withing the powershell you're currently using.
    You type ls function:
    if you type . variable_file_name.ps1 then it will load in all the functions defined in that file 
    into the function: drive so you have global access to them. 
#>

