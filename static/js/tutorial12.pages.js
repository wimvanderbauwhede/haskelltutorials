var thistutorial = tutorial12; 
// Module for the guide pages
tutorial12.pages = {};

// Unshow a string
tutorial12.pages.unString = function(str){
    return str.replace(/^"(.*)"$/,"$1").replace(/\\"/,'"');
}

// Random message from a list of messages
tutorial12.pages.rmsg = function(choices) {
    return choices[Math.floor((Math.random()*100) % choices.length)];
}

// Simple HTML encoding
tutorial12.pages.htmlEncode = function(text,shy){
    var x = $('<div></div>');
    x.text(text);
    return x.html();
}

// Added by WV
tutorial12.pages.isNum = function(result) {
  var retval =
    /(Num|Fractional|Integral|Floating)\s+[a-z]+\s+=>\s+[a-z]+/.test( result.type ) ||
    /\(Ord\s+[a-z]+\s*,\s*(Num|Fractional|Integral|Floating)\s+[a-z]+\)\s+=>\s+[a-z]+/.test( result.type ) ||
    /\((Num|Fractional|Integral|Floating)\s+[a-z]+\s*,\s*Ord\s+[a-z]+\)\s+=>\s+[a-z]+/.test( result.type ) ||
    result.type == "Integer" ||
    result.type == "Int" ||
    result.type == "Bool";
    return retval;
}

// Added by WV
tutorial12.pages.isBool = function(result) {
  var retval = result.type == "Bool";
    return retval;
}

// Added by WV
tutorial12.pages.isList = function(result) {
  var retval = /\[\w+\]/.test( result.type ) 
    return retval;
}

// All pages
tutorial12.pages.list =
    [

        {title:'Tutorial 1.2: Functions and Lists',
         guide:
         '<h3>Tutorial 1.2: The Essentials: Functions and Lists</h3>' +
         '<p>This tutorial will guide you through two essential concepts of the Haskell language: functions and lists. \
         You will learn the syntax, how to create and use functions and lists.</p>'+
         '<p>This tutorial has five sections:</p>'+
         '<ol>'+
         '<li>Defining a Function (<code>step2</code>)</li>'+
         '<li>Functions without a name: lambda functions(<code>step4</code>)</li>'+
         '<li>A key datastructure: the list (<code>step11</code>)</li>'+
         '<li>Constructing lists (<code>step17</code>)</li>'+
         '<li>Manipulating lists (<code>step24</code>)</li>'+
         '</ol>' +
         '<p>Type <code>step2</code> at the <span style="color: purple">&#955;</span> prompt to start the first section of the tutorial.</p>' +
         '<p>For help about the tutorial environment type <code>help</code> at the <span style="color: purple">&#955;</span> prompt.</p>'          
        },
        ////////////////////////////////////////////////////////////////////////
        // Lesson 1

        // Simple integer arithmetic
        {lesson:1,
         title:'Defining a function',
         guide:
         '<h3>Defining a function</h3>'+
        	 '<p>In Haskell, many functions are pre-defined in a standard library called the Prelude.'+
        	 'We have already encountered some of them in the previous tutorial, e.g. <tt>abs</tt>, <tt>max</tt> and <tt>min</tt>.</p>'+

        	 '<p>But the essence of functional programming is defining your own functions to solve your problems!</p>'+

        	 '<p>A function is defined by an equation. There are two ways to define a function. You can either define a named function, e.g.'+

        	 	'<code>f x = x+1</code></p>'+

        	 	'<p>The left hand side (lhs) of the equation looks like a variable – and that’s what it is! '+
        	 	'The right hand side (rhs) is an expression that uses the local variable and defines the result of the expression.</p>'        	 	
        },
        {
          trigger:function(result){
              return true;// /Expr/.test(result.type);
          }, 
          guide:function(result){
        	 	return '<p>To use the function, you apply it to an argument, e.g.'+

        	 	'<code>f 3</code>.</p>'

                    }
        },        	 
        
        {
            trigger:tutorial12.pages.isNum,
            guide:function(result){
          	 	return         	 '<p>You can of also define functions with multiple arguments, e.g.'+

        	 	'<code>add3nums x y z = x + y + z</code>.</p>';
            }
        },   
        {
        trigger:function(result){
            return true;// /Expr/.test(result.type);
        }, 
        guide:function(result){
      	 	return '<p>To use it, e.g. <code>10 + 4* add3nums 1 2 3</code>.</p>'   ;
        }
      },      

        // Lambda Functions

        {lesson:2,
         title:'Lambda functions',
         trigger:tutorial12.pages.isNum,
          guide:function(result){
        	  return '<h3>Functions without a name: lambda functions</h3>'+
        	'<p>You can also define a function without a name, known as a "lambda function" (or "anonymous function" in other languages),'+
        	'for example <code>\\x -> x+1</code>.</p>'+
        	'<p>On the lhs of the arrow you list the arguments, on the rhs the expression.</p>'+
        	
        	'<p>You can use this function straightaway, for example:'+        	  
        	'<code>(\\x -> x+1 ) 4</code>.</p>';
        }
        },
        
        // Lambda Functions - cont'd
        {
          trigger:tutorial12.pages.isNum,
          guide:function(result){
            return "<p>Or you can use an equation to assign the lambda function to a variable: "+

	"<code>fl = \\x -> x+1</code>.</p>";
          }
        },        
        
        
        // Lambda Functions- cont'd
        {
          trigger:function(result){
              return /Expr/.test(result.type);
          }, 
          guide:function(result){
        	  return "<p>In that way you can use it later: <code>fl 4</code>.</p>";
        	           	     
          }
        },

        // Lambda Functions - cont'd
        {
        	trigger:tutorial12.pages.isNum,
          guide:function(result){
        	  return "<p>You can of course also define lambda functions with multiple arguments, e.g. "+
        	  "<code>add3numsl = \\x y z -> x + y + z</code>"+
        	  "<p>You can use this function in exactly the same way as a named function, e.g. <code>10 + 4* add3numsl 1 2 3</code>.</p>";   
          }
        },
        
        // Expression Syntax - Corner cases 1
        {lesson:3,
        	title:'Lists',
        	trigger:tutorial12.pages.isNum,
          guide:function(result){
        	  return "<h3>A key datastructure: the list</h3>"+
        	  "<p>A list is a single value that contains several other values. The elements are written in square parentheses, separated by commas, e.g."+
        	  '<code>[2.718, 50.0, -1.0]</code> or <code>[1,2,4,8]</code> or <code>["A","list","of","strings"]</code>.</p>';
        }
        },
        {
        
        	trigger:tutorial12.pages.isList,
          guide:function(result){
        	  return "<h3>Lists</h3>"+
        	  "<p>A list is a single value that contains several other values. The elements are written in square parentheses, separated by commas, e.g."+
        	  '<code>[2.718, 50.0, -1.0]</code> or <code>[1,2,4,8]</code> or <code>["A","list","of","strings"]</code>.</p>';
        }
        },
        {
    	trigger:tutorial12.pages.isList,
        guide:function(result){
      	  return '<p>To get the length of a list you can use the <tt>length</tt> function: <code>length ["A","list","of","strings"]</code>.</p>';
      }
      },        

        // Function returning several results
        {
          trigger:tutorial12.pages.isNum,
          guide:function(result){
        	  return "<h4>Functions returning lists</h4>"+
              '<p>Actually, a function can return only one result.</p>'+
              '<p>However, lists allow you to package up several values into one object, which can be returned by a function.'+
              'Here is a function <tt>sumprod</tt> that returns both the sum and the product of two numbers:</p>'+
              '<p><code>sumprod = \\x y -> [x+y,x*y]</code></p>'+
              
              '<p>So, for example <code>sumprod 3 8</code> and <code>sumprod 8 3</code> both return the list [11,24].</p>';
        }
        },

        // 
        {
          trigger:function(result){
        	  return tutorial12.pages.isList(result) && !/Expr/.test(result.type);
          },
          
          guide:function(result){
        	  return "<h4>Naming lists</h4><p>A constant list such as <tt>[2,4,6,8]</tt> is a valid expression so you can assign it to a variable, e.g."+
        	  '<code>mylist = [2,4,6,8]</code></p>'+"<p>Now you can refer to this list by its name anywhere in the program</p>";
        	  
        }
        },
        // 
        {
          trigger:function(result){
        	  return tutorial12.pages.isList(result) && /mylist/.test(result.expr);
          },
          guide:function(result){
//        	  alert(result.expr);
        	  return  '<p>The elements of a list can also be expressions, which are evaluated when they are accessed. Suppose you define:</p>'+
        	  '<p><code>answer = 42</code></p>'+
        	  "<p><code>yourlist = [7, answer+1, 7*8]</code></p>";
        }
        },

        // 
        {
        	trigger:tutorial12.pages.isList,
          guide:function(result){
        	  return "<p>Then when you evalue <code>yourlist</code> you get <tt>"+result.value+"</tt>.</p>";
       }


        },

// Constructing lists
        {lesson:4,
         title:'Constructing lists',
         trigger:function(result){
               return true;
         },

          guide:function(result){
          var next_step = "<h3>Constructing lists</h3>" 
          + "<p>Apart from explicitly writing the list expression, there are several other ways to construct lists</p>"
          	+	"<h4>Adding an element to a list: the (:) operator</h4>"
          +'<p>The <tt>(:)</tt> ("cons") operator takes a scalar and an existing lists, and returns a new list containing all the elements. </p>'+"<p>For example, <code>23 : [48, 41, 44]</code></p>";
              return next_step;
       }

        },
        {
            // Cons (2)
            trigger:tutorial12.pages.isList,
        guide:function(result){
            var next_step = 
             "<p>You can use this operator to turn a scalar into a list:</p>"
            		
            +"<code>42 : []</code> is the same as <code>[42]</code></p><p>The cons operator is usually used in a recursive fashion, as we will see later.</p>";
                return next_step;
         }

          },        

        {
            // Append (1)
            trigger:tutorial12.pages.isList,
            guide:function(result){
                var next_step = 
                		"<h4>Joining lists: the (++) operator</h4>"
                +'<p>The <tt>(++)</tt> ("append") operator takes two existing lists, and gives you a new one containing all the elements. </p>'+"<p>For example, <code>[23, 29] ++ [48, 41, 44]</code></p>";
                    return next_step;
             }
        },
        {
          // Append (2)
          trigger:tutorial12.pages.isList,
          guide:function(result){

var next_step="<p>You can verifiy that the length of the joint list is always the sum of the lengths of the original lists:</p><p><code>length [23, 29] + length [48, 41, 44] == length ([23, 29] ++ [48, 41, 44])</code></p>";
return next_step;
                },
        },


        // Sequences (1)
        {
          trigger:function(result){
            var retval = tutorial12.pages.isBool(result);
            return retval ;
          },
          guide:function(result){
            var next_step="<h4>Sequences</h4>"
            +"<p>Sometimes it’s useful to have a sequence of numbers. "
            +"In standard mathematical notation, you can write 0,1,…,n.</p>"
            +"<p>In Haskell you can use the sequence notation for lists, e.g. <code>[0 .. 5]</code> or <code>[100 .. 105]</code> or <code>[2,4 .. 16]</code>.</p>";
            return next_step;
        }
        },
        // Sequences (2)
        {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return retval ;
          },
          guide:function(result){
            var next_step="<p>Sequences are not limited to integers: you can write <code>[1.1,1.2 .. 2.0]</code> or even <code>[0x0A .. 0x1F]</code>";            
            return next_step;
        }
        },

        // Sequences (3)
        {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return retval ;
          },
          guide:function(result){
            var next_step="<p>They are not even limited to numbers: <code>['a','d' .. 'z']</code> works as well!</p>";            
            return next_step;
        }
        },

        // List comprehensions (1)
        {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return retval ;
          },
          guide:function(result){
             var next_step="<h3>List comprehensions</h3>"
                 +"<p>Sequences are fine, but sometimes you need more expressive power. A list comprehension is a high level notation for specifying the computation of a list. It is inspired by the mathematical notation for set comprehension.</p>"
+"<p>Let's look at a simple examples of list comprehension:</p>"
+"<p><code>[3*x | x <- [1..10]]</code></p>"+"<p>As you can see, to the left of the bar <tt>|</tt> we have an expression that is computed for every element of the list to the right. The parameter in the expression is specified using the left arrow <tt>&lt;-</tt></p>";
                 
            return next_step;
        }
        },
         // List comprehensions (2)
        {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return retval ;
          },
          guide:function(result){
             var next_step= 
"<p>Another example: <code>  [2*x+1 | x <- [0,2..10]]</code></p>"
+"<p>The list can be defined in any of the previous ways, as a constant, variable or sequence</p>";                 
            return next_step;
        }
        },

 // List comprehensions (4)
        {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return retval ;
          },
          guide:function(result){
             var next_step="<p>You can also specify multiple list to create a single new list, for example:</p><p><code>  [[a,b] | a <- [10,11,12] , b <- [20,21]]</code></p>";
                 
            return next_step;
        }
        },

// Operating on lists
          {lesson:5,
            title:'Manipulating lists',
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return retval ;
          },
          guide:function(result){
             var next_step="<h3>Manipulating lists</h3>" 
             +"<p>Haskell provides many ways to operate on lists. Remember that the original list is never modified!</p>"
             		+"<h4>Indexing</h4>"
                 +"<p>Haskell lists are indexed starting with 0. The <tt>(!!)</tt> operator takes a list and an index, and returns the corresponding element:"
                 +"<p><code>[5,3,8,7]  !! 2</code> returns 8; <code>[0 .. 100]  !! 81</code>  returns 81.</p>";
                 
            return next_step;
        }
        },

// Operating on lists
          {
          trigger:tutorial12.pages.isNum,
          guide:function(result){
        	  tutorial12.continueOnError=true;
             var next_step="<p>If the index is negative or too large, and exception is returned:</p>"
                 +"<p><code>['a'..'z'] !! 33</code></p>"; // TODO: check what this does!          
            return next_step;
        }
        },
// head and tail

 {
            trigger:function(result){
            	//alert(result.error);
                return /index\ too\ large/.test(result.error);
            },
          guide:function(result){
        	  tutorial12.continueOnError=false;
var next_step="<h3><tt>head</tt> and <tt>tail</tt></h3>"
+"<p>There are standard library functions to give the head of a list (its first element) or the tail (all the rest of the list): <code>head [4,5,6]</code> returns <tt>4</tt>.</p>";
 return next_step;
        }
        },
 {
          trigger:tutorial12.pages.isNum,
          guide:function(result){

 var next_step="<p>And <code>tail [4,5,6]</code> returns <tt>[5,6]</tt></p>";
 return next_step;
        }
        },
 {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return retval ;
          },
          guide:function(result){
        	  tutorial12.continueOnError=true;
 var next_step="<p>What happens if you try to take the head of an empty list? <code>head [] :: Int</code></p>";
 return next_step;
        }
        },
 {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return true;//retval ;
          },
          guide:function(result){
        	  tutorial12.continueOnError=true;
 var next_step="<p>As expected, you get an exception.</p>"
+"<p>And what if you try to take the tail of an empty list? <code>tail [] :: [Int]</code></p>";
 return next_step;
        }
        },
 {
          trigger:function(result){
            var retval = tutorial12.pages.isList(result);
            return true;//retval ;
          },
          guide:function(result){
        	  tutorial12.continueOnError=false;
 var next_step="<p>Again an exception is raised.</p>" +
 		"<p>In the expressions above we used <tt>:: Int</tt> and <tt>:: [Int]</tt>, these are examples of Haskell types, which will also be introduced in the next lessons; we used them because the browser-based system needs this information to print the exception.</p>" 
 		+"<p>For robust programming, we need to ensure either that all expressions are well defined, or else that all exceptions are caught and handled.</p>"
	 +"<p>In the next lessons you will be introduced to more predefined list manipulation functions and learn how to write your own functions for working with lists.</p>"
	   
	 +"<p>Please type <code>next</code> to continue to the recap page.</p>";
 return next_step;
        }
        },
                    
    {
    	  trigger:function(result){
    	    return true;
    	  },
    	  guide:function(result){
    		  
    	    var msg="<h3>And that's the end of Tutorial 1.2!</h3>" +
    	    		"<p>Well done, another Haskell tutorial finished!.</p>" +
    	    		"<p>Let's recap what we've learned:</p>" +
    	            '<ol>'+
    	            '<li>Defining a function: a function defines an expression with variables</li>'+	            
    	            "<li>Lambda functions: functions don't need a name</li>"+
    	            '<li>The list datastructure: the key datastructure in Haskell</li>'+
    	            '<li>Constructing lists: the (:) and (++) operators, sequences, comprehensions</li>'+
    	            '<li>Manipulating lists: indexing, head and tail</li>'+
    	            '</ol>';

    	    return msg;
    	  },
    	},        
        {title:'Haskell Interactive Tutorials',
    	   	 guide:    	    	  
    	   	       '<h3>Haskell Interactive Tutorials</h3>' +
    	   	       '<p>In this environment you can try out Haskell code or take tutorials that guide you by prompting you to enter pieces of code and give you feedback on them. '+
    	   	       'Each tutorial has its own url,'+
    	   	       ' the url for this tutorial is <a href="'+thistutorial.url+'">'+thistutorial.url+'</a>.</p>'+
    	   	       '<h4>Functionality</h4>' +
    	   	       '<p>This coding environment does not offer all the functionality of the Haskell compiler <tt>ghc</tt> or the interactive Haskell interpreter <tt>ghci</tt>, '+
    	   	       'because that would allow hackers to compromise your computer. Any feature that could potentially be a security risk has been disabled.</p>'+
    	   	       '<p>Only <a href="https://hackage.haskell.org/package/pure-io-0.2.0/docs/PureIO.html#g:2">the following</a> IO actions are supported in this app (more about this later in the course).</p>' +
    	   	       '<p>You cannot declare your own types or load content from modules</p>'+
    	   	       '<h4>Navigation commands</h4>' +
    	   	       '<p>You can either type commands at the <span style="color: purple">&#955;</span> prompt or click on any command link in the tutorial text (styled like this: <code>help</code>), this will insert that command at the prompt.</p>' +
    	   	       '<p>To navigate between steps in the tutorial you can use following commands:</p>' +
    	   	       '<ul>' +
    	   	       '<li>To start the tutorial: type <code>start</code> at the <span style="color: purple">&#955;</span> prompt </li>' +
    	   	       '<li>To go to the next step: <code>next</code></li>' +
    	   	       '<li>To go to the previous step: <code>prev</code> or <code>back</code> </li>' +
    	   	       '<li>To go to a particular step <i>n</i>: <code>step<i>n</i></code></li>' +
    	   	       '<li>To see this help message: <code>help</code> '+
    	   	       '</ul>' +
    	   	       '<p>On the command line you can use the left and right arrows or <tt>Ctrl-b</tt> and <tt>Ctrl-f</tt>, as well as <tt>Ctrl-a</tt> to jump to the start of the line and <tt>Ctrl-e</tt> to jump to the end of the line.</p>' +
    	   	    '<p>You can use the up and down arrows or <tt>Ctrl-p</tt> and <tt>Ctrl-n</tt> to navigate through the history of commands you entered.</p>' +
    	   	       '<h4>Manipulating the context</h4>' +    	       
    	   	       '<p>The environment keeps a list of all equations you defined, we call this the <i>context</i>. Every computation you execute uses this context as follows:</p>' +
    	   	       '<pre>'+
    	   	       'let<br>'+
    	   	       '  <i>context</i><br>'+
    	   	       'in<br>'+
    	   	       '  <i>your_expression</i>'+
    	   	       '</pre>' +
    		       '<p>You can access and manipulate the context in the following ways:</p>' +
    		       '<ul>' +
    	   	       '<li>Inspect the context: <code>context</code> or <code>show</code></li>' +
    	   	       '<li>Remove the last added equation: <code>undo</code></li>' +
    	   	       '<li>Remove the equation for a given variable: <code>forget <i>varname</i></code></li>' +
    	   	       '<li>Erase the entire context: <code>erase</code> or <code>wipe</code></li>' +
    	   	       '<li>Reset the tutorial completely: <code>reset</code></li>' +
    	   	       '</ul>'
    	   	      },
    ];
