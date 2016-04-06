
// Module for the guide pages
tutorial23.pages = {};

// Unshow a string
tutorial23.pages.unString = function(str){
    return str.replace(/^"(.*)"$/,"$1").replace(/\\"/,'"');
}

// Random message from a list of messages
tutorial23.pages.rmsg = function(choices) {
    return choices[Math.floor((Math.random()*100) % choices.length)];
}

// Simple HTML encoding
tutorial23.pages.htmlEncode = function(text,shy){
    var x = $('<div></div>');
    x.text(text);
    return x.html();
}

// Added by WV
tutorial23.pages.isNum = function(result) {
  var retval =
    /(Num|Fractional|Integral|Floating)\s+[a-z]+\s+=>\s+[a-z]+/.test( result.type ) ||
    /\(Ord\s+[a-z]+\s*,\s*(Num|Fractional|Integral|Floating)\s+[a-z]+\)\s+=>\s+[a-z]+/.test( result.type ) ||
    /\((Num|Fractional|Integral|Floating)\s+[a-z]+\s*,\s*Ord\s+[a-z]+\)\s+=>\s+[a-z]+/.test( result.type ) ||
    result.type == "Integer" ||
    result.type == "Int" ||
    result.type == "Bool";
    return retval;
}

tutorial23.pages.isBool = function(result) {
    return (result.type == "Bool");
}

tutorial23.pages.isInt = function(result) {
    return (result.type == "Int");
}

tutorial23.pages.isString = function(result) {
    return (result.type == "String") || (result.type == "[Char]");
}



    


// All pages
tutorial23.pages.list =
    [
      {title:'Haskell Interactive Tutorials',
       guide:
       '<div class="indent">' +
       '<h3>Haskell Interactive Tutorials</h3>' +
       //title="Click me to insert &quot;start&quot; into the console." style="cursor: pointer;"
       '<p>In this environment you can try out Haskell code or take tutorials that guide you by prompting you to enter pieces of code and give you feedback on them. Each tutorial has its own url, e.g. for Tutorial 2 it is <a href="'+tutorial23.url+'">'+tutorial23.url+'</a>.</p>'+
       '<br>'+
       '<p>This coding environment does not offer all the functionality of the Haskell compiler <tt>ghc</tt> or the interactive Haskell interpreter <tt>ghci</tt>, because that would allow hackers to compromise your computer. Any feature that could potentially be a security risk has been disabled.</p>'+
       '<p>Only <a href="https://hackage.haskell.org/package/pure-io-0.2.0/docs/PureIO.html#g:2">these</a> IO actions are supported in this app (more about this later in the course).</p>' +
       '<p>Type <code>start</code>  at the <span style="color: purple">&#955;</span> prompt to start the tutorial.</p>' +
       '<p>Or try typing any Haskell expression and see what happens.' +
       '<small class="note">(click to insert)</small>:</p>' +
       '<p>' +
       '<code title="Click me to insert &quot;23 * 36&quot; into the console." style="cursor: pointer;">23 * 36</code> or <code title="Click me to insert &quot;reverse ' +
       '&quot;hello&quot;&quot; into the console." style="cursor: pointer;">reverse ' +
       '"hello"</code> or <code title="Click me to insert &quot;foldr (:) [] [1,2,3]&quot; into the console." style="cursor: pointer;">foldr (:) [] [1,2,3]</code> or <code title="Click me to insert." style="cursor: pointer;">do line <- getLine; putStrLn line</code> or <code>readFile "/welcome"</code>' +
       '</p>' +

       '</div>'
      },
        {title:'Tutorial 2.3: Input/Output Operations',
         guide:
         '<div class="indent">' +
         '<h3>Tutorial 2.3: Input/Output Operations</h3>' +
         '<p>We are going to explore how to do simple string-based input/output operations today.</p>'+
         '<p>To go to the next step in the tutorial use <code>next</code>, to go back use <code>back</code>.</p>' +
         '</div>'
        },
        ////////////////////////////////////////////////////////////////////////
        // Lesson 1

        // Simple print operations
        {lesson:1,
         title:'Printing Strings',
         guide:
         '<h3>Printing Strings</h3>'
         + "<p>The Haskell function to print a character string to the terminal is putStrLn (like println in Java or print in Python). Try printing a simple message like: <code>putStrLn &quot;hello world&quot;</code></p>"
        },
        {
          trigger:function(result){
            correctResult = result.type == "IO ()";
            return correctResult;
          },
          guide:function(result){
            msg = "<p>See how the string has been printed in the console window on the left?</p>";
            tutorial23.continueOnError = true;
	    var next_step = "<p>Now let's read in a character string from user input, this is like sscanf in C or input in Python. Call the <code>getLine</code> function, then type in some text followed by pressing the enter key</p>";
	    return msg + next_step;
          }
        },
        {
          trigger:function(result){
            correctResult = result.type == "IO String";
            return correctResult;
          },
          guide:function(result){
            msg = "<p>See how the string is returned as a result of the function call  in the console window on the left?</p>";
            tutorial23.continueOnError = true;
	    var next_step = "<p>Now let\'s chain together some input and output - with appropriate sequencing. We want to find the name of a person, then print out a personalized greeting. <code> do { putStrLn &quot;what is your name?&quot;; x <- getLine; putStrLn (&quot;hello &quot; ++ x) }</code></p>";
	    return msg + next_step;
          }
        },
        {
          trigger:function(result){
            correctResult = result.type == "IO ()";
            return correctResult;
          },
          guide:function(result){
            msg = "As we have seen, you need to sequence IO operations with the <tt>do</tt> keyword. Values are bound to variables using the left arrow, called <em>bind</em>. You can't use the standard assignment (with the equals operator) for getLine, since it is an IO operation.";
            
            var next_step = "<p>Once we have got a value from getLine, and bound it to a variable, then we can do standard function calls on this value, and bind it to another variable - for instance, let's turn a name into upper case: <code>do { putStrLn &quot;what is your name?&quot;; n<-getLine; nUpper<-return (map toUpper n); <br/>putStrLn (&quot;HELLO &quot; ++ nUpper) }";
	    return msg + next_step;
          }
        },
        // read and show
        {lesson:2,
         title:'Read and Show functions',
         trigger:function(result){
	   ioResult = result.type == "IO ()";
           return ioResult;
	 },
         guide:function(result){
           var msg = "";

           var next_step =
            "<h3>The Read function</h3>"
            +"<p>It is possible to read values as strings, and convert them into other types. This is like the atoi() function in C. Try <code>read &quot;42&quot; :: Int</code>. You need the <tt>::Int</tt> type annotation otherwise it is not clear what type of number is represented by the String.";
	   return msg + next_step;
	 }
        },

        {
          trigger:tutorial23.pages.isInt,
          guide:function(result){
	      tutorial23.continueOnError = true;
              var msg = "<p>See how the string is converted to an Int value?";
              var next_step = "<p>However 42 could also be a floating-point number, try <code> read &quot;42&quot;::Float</code>.";
            return msg + next_step;
          }
        },

	{
         trigger:function(result) {
	   floatResult = result.type == "Float";
	   return floatResult;
	 },
         guide:function(result){
	     var msg = "<p>Notice that the returned result has the <tt>Float</tt> type.";
	     var next_step = "<p>The <tt>show</tt> function is the dual of the <tt>read</tt> function. <tt>show</tt> takes a value and returns a String representation of that value. Try <code>show 42</code>.";
             return msg + next_step;
         }
        },

        {
         trigger:tutorial23.pages.isString,
          guide:function(result){
            var msg = "<p>Notice that the returned value has the String type. Only some types (those that derive Show) can be converted to Strings - see later";
            var next_step = "<p>The <tt>show</tt> function allows arbitrary values to be printed. Try <code>putStrLn (show (6*7))</code>";
            return msg + next_step;
          }
        },

        {
         trigger:function(result){
	   ioResult = result.type == "IO ()";
           return ioResult;
	 },
         guide:function(result){
           var msg = "In fact, there is a single function called <tt>print</tt> that does the composition of putStrLn and show .... try <code>print 42</code>.";

           var next_step = ""
           return msg+next_step;
         }
        },
        // final step
        {
         trigger:function(result){
	   ioResult = result.type == "IO ()";
           return ioResult;
	 },
	  guide:function(result){
		  
	    var msg="<h3>And that's the end of Tutorial 2.3 !</h3>" +
	    		"<p>Well done, you have completed another Haskell tutorial!.</p>" +
	    		"<p>Let's recap what we've discovered:</p>" +
	            '<ul>'+
	            '<li><tt>getLine</tt> and <tt>putStrLn</tt> for console input/output</li>' +
		    '<li>using <tt>do</tt> and &lt;- for binding values to variables with IO</li>' +
                    '<li>show and read for converting from and to <tt>String</tt> values</li>' +
	            '</ul></p>';

	    return msg;
	  },
	},
]