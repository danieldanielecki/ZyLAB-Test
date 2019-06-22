module.exports = {
  name: 'zylab-workspace',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/zylab-workspace',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
