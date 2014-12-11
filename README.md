##What is Falcor?

Falcor is an application that lets you collaborate on (neverending) stories with friends with a convenient tree-based structure that allows users to create branches and start again from any leaf on the tree.  So it’s like choose-your-own-adventure, but for writers

##How to use Falcor?

Falcor is easy to use.  Once you sign up, you will hit the landing page where you have three options: create a story, your stories, or explore stories.  

Creating a story is as easy as choosing a title, writing the first line of your story, and selecting whether or not it is public or private.  All public stories will be shown on the explore stories page, where all users can choose to see them and contribute to them.  Your Stories shows a list of your submissions, so you can choose to jump back into your stories from there.

The story page shows the tree graph, as well as the story text.  In order to see the story text of a certain branch, simply click on the node of that tree.  Then, click on the highlighted text to pull up a menu of options for that submission.  From that menu, you can like a post, export that branch of the story to PDF, check out some data on that branch with the analyze button, or extend that branch with a new submission.  

That’s it, hope you enjoy.

##How Falcor Works


###Language 

Tree – another word for story; each story is a collection of nodes that are interrelated through a tree-like data structure. Throughout this document, we use tree and story interchangeably 

Node – each submission of writing is a node. Nodes are the irreducible components of each story. Each node has exactly one parent and thus, only one route to the root node. Nodes may have many children, and thus, many routes to the lowest level of the tree (comprised of childless nodes). 

Branch – Each path from the root node to a childless node (a node on the lowest level of the tree) is a branch. The number of childless nodes corresponds to the number of branches. 

###Models 

We used Mongoose, a Node.js wrapper for MongoDB, to model key pieces of data:

Node – The node model holds all of the key data pertaining to a story: the submitted text, the number of likes, ancestors (the path of nodes between it and the root node), descendants (all of the nodes that inherit from it), its author, story id, etc. 

Story – The story schema holds the name of each story as well as the date on which that story was created. We use this schema to generate unique story ids for the nodes. Each node has a story id that facilitates easy querying for all nodes that belong to a single story. 

User – The user model holds all of the typical user data in addition to an array of story ids that the user has created. 

###MongoDB & Trees

We considered Neo4j, Firebase, Redis and a few other databases before deciding to go with MongoDB. Once we decided that we wanted to keep 99% of all relevant story data on the node as opposed to constructing a branch schema and a data heavy story schema, we realized that we didn’t need any of the special features that the aforementioned data stores provide. 

As a result of this design choice, our updates to the tree are entirely atomic. This means that with only one query, we can 1) look up the tree to retrieve a node’s ancestors and 2) look down the tree to gather all of the node’s descendants. These operations are critical to displaying a branch-by-branch view of the tree for our users. 


We initially wrestled with creating a branch schema to facilitate database querying for descendant nodes. Looking up the tree is far easier than looking down, as there is only one route up yet any node may have any number of descendants. We eventually decided to store both ancestors and descendants in arrays on each node. 
We developed a succinct recursive function to efficiently model the non-linear relationship between each node and its descendants with multi-dimensional arrays. This design choice yielded optimal results when we leveraged D3.js to model our tree.  

###Sockets 

As soon as we conceived of this project, we knew that its playfulness and usability depended on our ability to display real-time updates to stories for all users. We set out to make co-writing an easy, playful and aesthetically pleasing experience. Socket.io, a Node.js web socket library, enables users to see real-time updates as they contribute to a story. 

As soon as users sign in, they receive a socket. Upon clicking on a story link, that socket subscribes to a room so that it can listen to any submissions, likes or events pertaining to that story. Upon leaving the story view, the user’s socket is deregistered from that room. 


###Tree Visualization

We based our tree off a modified version of @mbostock's
Collapsible Tree Layout (http://mbostock.github.io/d3/talk/20111018/tree.html) .

It makes use of D3.js (http://d3js.org/) to create an interactive visualization of the story, and maps the text to the corresponding selected nodes and branches.

The data is initially retrieved with an AJAX call to the server. Thereafter, interaction with the server such as adding new nodes are done using socket.io's Web Socket library. This enables us to broadcast to everyone on the story that a new node has been added, and will update their tree view in real-time.  The advantage of web sockets over recurring AJAX calls is that it reduces the number network calls and interacts with the database much less, along with providing real-time updates.
