// create poll
export function createPoll(userId, title, options) {
  return {
    type: 'CREATE_POLL',
    userId,
    title,
    options
  }
}

// edit poll

// delete poll
export function deletePoll(pollId) {
  return {
    type: 'DELETE_POLL',
    pollId
  }
}

// vote poll
export function vote(pollId, optionId) {
  return {
    type: 'CAST_VOTE',
    pollId,
    optionId
  }
}
