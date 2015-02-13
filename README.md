# Session Affinity Test

Socket.io relies on sticky sessions for multiple-node support:

- http://socket.io/docs/using-multiple-nodes/

The polling transports of SockJS (used by Meteor) also require sticky sessions:

- http://stackoverflow.com/questions/22594942/sockjs-and-meteor-what-if-load-balancer-do-not-support-sticky-sessions

With one dyno, you'll get a nice solid connection to both.
As the number of dynos grows, the connections become less reliable
as the chance of subsequent connections to the same dyno diminishes.
