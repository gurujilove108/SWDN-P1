<# 
    Just want to say that windows powershell is very very powerfull and its the only reason
    I like windows over unix. Windows Powershell scripting is way more advanced than unix based shell scripting.
    powershell scripting is object oriented, but we will get into that later

    Even though this doesnt make things that easier,
    It's stil cool and fun in my opinion.
    Truth is I just wanted to make use my powershell skills
    to do this.And If you have windows and ur a programmer and you dont
    powershell, I feel really sorry for you lol jk
#>

<#
    @param commit parameters like -a or -am
    @param string, git commit string
#>

<# 
    There is a global function drive in windows called function:
    To See all the functions available in your shell you just call ls function:
    to load a powershell file of functions into that function drive, 
    you run the following command in the shell
    . powershell_file.ps1
#>
function git_commit($git_params, $commit_message) {
	invoke-expression "git commit $git_params $commit_message"
}

function gpom {
    invoke-expression "git push origin master"
}

function run_git_commit($git_params, $commit_message) {
    git_commit $git_params $commit_message
    gpom
}


