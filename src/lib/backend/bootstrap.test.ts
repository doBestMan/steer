import { IncomingMessage } from 'http';
import { Socket } from 'net';

import { URLS } from '~/lib/constants/urls';

import * as FetchModule from '../fetch';
import { backendBootstrap, getBackendEnvVariables } from './bootstrap';

function createFakeRequest() {
  const fakeIncomingMessage = new IncomingMessage(new Socket());
  const fakeRequest = Object.assign(fakeIncomingMessage, {
    query: {},
  });
  return fakeRequest;
}

describe('backendBootstrap', () => {
  beforeEach(() => {
    jest
      .spyOn(FetchModule, 'fetchSetAuthorizationFunction')
      .mockImplementation();
    jest.spyOn(FetchModule, 'fetchSetUrlBase').mockImplementation();
  });

  it('works without a request object', () => {
    backendBootstrap();

    expect(FetchModule.fetchSetUrlBase).toHaveBeenCalled();
  });

  it('configures authentication header', () => {
    const request = createFakeRequest();
    backendBootstrap({ request });

    expect(FetchModule.fetchSetAuthorizationFunction).toHaveBeenCalled();
  });

  it('configures the server', () => {
    const request = createFakeRequest();
    backendBootstrap({ request });

    expect(FetchModule.fetchSetUrlBase).toHaveBeenCalled();
  });
});

describe('getBackendEnvVariables', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    /* eslint-disable sort-keys */
    process.env = {
      ...OLD_ENV,
      STEER_CLIENT_ID: 'sharedId',
      STEER_CLIENT_SECRET_MOCK: 'mockSecret',
      STEER_CLIENT_SECRET_INTEGRATION: 'integrationSecret',
      STEER_CLIENT_SECRET_PROD: 'prodSecret',
    };
    /* eslint-enable sort-keys */
    jest.spyOn(global.console, 'log').mockImplementation();
  });

  afterEach(() => {
    process.env = { ...OLD_ENV };
  });

  test('production deploy', () => {
    process.env.VERCEL_GITHUB_COMMIT_REF = 'master';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_PRODUCTION,
      clientId: 'sharedId',
      clientSecret: 'prodSecret',
    });
  });

  test.each([
    'feature-sqa-001',
    'feature-SQA-001',
    'feature-sqa-001-some-description',
  ])('feature branch - %s', (branch) => {
    process.env.VERCEL_GITHUB_COMMIT_REF = branch;

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: 'https://sqa-001-services.jenkins.simpletire.com',
      clientId: 'sharedId',
      clientSecret: 'integrationSecret',
    });
  });

  test.each(['dev', 'qa', 'any-other-branch'])(
    'integration deploy - %s',
    (branch) => {
      process.env.VERCEL_GITHUB_COMMIT_REF = branch;

      expect(getBackendEnvVariables()).toEqual({
        backendEndpoint: URLS.MAIN_API_INTEGRATION,
        clientId: 'sharedId',
        clientSecret: 'integrationSecret',
      });
    },
  );

  test.each(['mock-dev', 'mock-qa'])('mock deploy - %s', (branch) => {
    process.env.VERCEL_GITHUB_COMMIT_REF = branch;

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: 'https://steer-api-definition.vercel.app/api',
      clientId: 'sharedId',
      clientSecret: 'mockSecret',
    });
  });

  test.each(['mock-sqa-001'])('mock feature branch - %s', (branch) => {
    process.env.VERCEL_GITHUB_COMMIT_REF = branch;

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint:
        'https://steer-api-definition-git-sqa-001-steer.vercel.app/api',
      clientId: 'sharedId',
      clientSecret: 'mockSecret',
    });
  });

  test('local development - local backend', () => {
    process.env.STEER_BACKEND = 'local';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_LOCAL,
      clientId: 'sharedId',
      clientSecret: 'mockSecret',
    });
  });

  test('local development - integration backend', () => {
    process.env.STEER_BACKEND = 'integration';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: URLS.MAIN_API_INTEGRATION,
      clientId: 'sharedId',
      clientSecret: 'integrationSecret',
    });
  });

  test('local development - feature branch backend', () => {
    process.env.STEER_BACKEND = 'sqa-001';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: 'https://sqa-001-services.jenkins.simpletire.com',
      clientId: 'sharedId',
      clientSecret: 'integrationSecret',
    });
  });

  test('local development - mock backend', () => {
    process.env.STEER_BACKEND = 'mock';

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: 'https://steer-api-definition.vercel.app/api',
      clientId: 'sharedId',
      clientSecret: 'mockSecret',
    });
  });

  test('local development - undefined backend', () => {
    process.env.STEER_BACKEND = undefined;

    expect(getBackendEnvVariables()).toEqual({
      backendEndpoint: 'https://steer-api-definition.vercel.app/api',
      clientId: 'sharedId',
      clientSecret: 'mockSecret',
    });
  });
});
