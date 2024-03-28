// Declare base content
var before = document.getElementById("before");
var prompt = document.getElementById("prompt");
var command = document.getElementById("prompt_sp"); 
var textarea = document.getElementById("console_line"); 
var terminal = document.getElementById("terminal");

var git = 0;
var commands = [];

setTimeout(function() {
  showContent(banner, "", 80);
  setFocus();
}, 100);

window.addEventListener("keyup", enterKey);
window.addEventListener("click", setFocus);

// CLI typing logic
textarea.value = "";
command.innerHTML = textarea.value;

// Entrypoint

function enterKey(e) {
  e = e || event // IE
  if (e.keyCode == 181) {
    document.location.reload(true);
  } else if (e.keyCode == 13) {
    commands.push(command.innerHTML);
    git = commands.length;
    printLine("guest@magarus.com.ar:~$ " + command.innerHTML, "no-animation", 0);
    selectCommand(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
  } else if (e.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = commands[git];
    command.innerHTML = textarea.value;
  } else if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    if (commands[git] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = commands[git];
    }
    command.innerHTML = textarea.value;
  }
}

function selectCommand(cmd) {
    switch(cmd.toLowerCase()) {
      // Core
      case 'help':
        showContent(help, "info margin", 80);
        break;
      case 'about':
        showContent(about, "info margin", 80);
        break;
      case 'projects':
        showContent(projects, "info margin", 80);
        break;
          break;
      case 'social':
        showContent(social, "info margin", 80);
        break;
      case 'email':
        printLine('Opening mailto:<a href="mailto:sitemagarus@gmail.com">sitemagarus@gmail.com</a>...', "info", 80);
        newTab(email);
        break;
      case 'history':
        printLine("<br>", "", 0);
        showContent(commands, "info", 80);
        printLine("<br>", "command", 80 * commands.length + 50);
        break;
      case 'clear':
        setTimeout(function() {
          terminal.innerHTML = '<a id="before"></a>';
          before = document.getElementById("before");
        }, 1);
        break;
      // Social
      case 'github':
        printLine("Opening GitHub...", "info", 0);
        newTab(github);
        break;
      case 'linkedin':
        printLine("Opening LinkedIn...", "info", 0);
        newTab(linkedin);
        break;
      // Jokes
      case "ls":
        printLine("This is not a real Terminal 😂", "info", 0);
      case "sudo":
        printLine("Are you trying to hack the site? 🤨", "info", 0);
      default:
        printLine("<span class=\"error\">command not found: " + cmd + ". For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
        break;
    }
}

// Utilities

function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

function printLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}
  
function showContent(name, style, time) {
  name.forEach(function(item, index) {
    printLine(item, style, index * time);
  });
}

function setFocus() {
  textarea.focus();
}