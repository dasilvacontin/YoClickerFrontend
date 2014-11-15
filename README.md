Yoclicker
=========

# GET /create/:uid

Poll creator.

# GET /voter/:aid/:uid

Gets list of polls for the accountId from the backend and shows them to the user. If there's only one poll available, it redirects to /voter/:aid/:pid/:uid

# GET /voter/:aid/:pid/:uid

Gets list of choices for the pollId from the backend and shows them to the user.
