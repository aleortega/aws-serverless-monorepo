module.exports = {
  rules: {
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'recruiters-service',
        'job-offers-service',
        'candidates-service',
        'auth-service',
        'cross-services',
        'documentation',
        'configuration'
      ]
    ],
    'scope-empty': [2, 'never'],
    'scope-enum': [2, 'always', ['add', 'fix', 'remove', 'update', 'refactor']],
    'subject-empty': [2, 'never']
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^\[(.*)\]\ - (.*) - (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
    }
  }
};
