// These are just PropTypes examples for reference, not type definitions
export const FORM_STATE_SHAPE = {
  title: '',
  description: '',
  image: '',
  liveSiteUrl: '',
  githubUrl: '',
  category: ''
};

export const PROJECT_SHAPE = {
  title: '',
  description: '',
  image: '',
  liveSiteUrl: '',
  githubUrl: '',
  category: '',
  id: '',
  createdBy: {
    name: '',
    email: '',
    avatarUrl: '',
    id: ''
  }
};

export const USER_PROFILE_SHAPE = {
  id: '',
  name: '',
  email: '',
  description: null,
  avatarUrl: '',
  githubUrl: null,
  linkedinUrl: null,
  projects: {
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: false,
      startCursor: '',
      endCursor: ''
    }
  }
};

export const SESSION_SHAPE = {
  user: {
    id: '',
    name: '',
    email: '',
    avatarUrl: ''
  }
};

export const PROJECT_FORM_SHAPE = {
  title: '',
  description: '',
  image: '',
  liveSiteUrl: '',
  githubUrl: '',
  category: ''
};