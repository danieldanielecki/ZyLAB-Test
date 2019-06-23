module.exports = {
  name: 'authors',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/authors',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
