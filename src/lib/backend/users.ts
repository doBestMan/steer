import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';

import { fetch } from '../fetch';

export async function backendCreateUserSession({ userIp }: { userIp: string }) {
  const response = await fetch<
    {
      userPersonalization: UserPersonalization;
      userSessionId: string;
    },
    { userIp: string }
  >({
    endpoint: '/v1/users/session',
    includeAuthorization: true,
    jsonBody: {
      userIp,
    },
    method: 'post',
  });

  return response;
}

export async function backendGetUserPersonalization({
  userSessionId,
}: {
  userSessionId: string;
}) {
  const response = await fetch<{ userPersonalization: UserPersonalization }>({
    endpoint: '/v1/users/{userSessionId}/personalization',
    includeAuthorization: true,
    method: 'get',
    params: {
      userSessionId,
    },
  });

  return response;
}

export async function backendUpdateUserPersonalization({
  gaClientId,
  userLocationGooglePlacesId,
  userLocationZip,
  userSessionId,
}: { userSessionId: string } & UserPersonalizationUpdate) {
  const response = await fetch<
    { userPersonalization: UserPersonalization },
    UserPersonalizationUpdate
  >({
    endpoint: '/v1/users/{userSessionId}/personalization',
    includeAuthorization: true,
    jsonBody: {
      gaClientId,
      userLocationGooglePlacesId,
      userLocationZip,
    },
    method: 'put',
    params: {
      userSessionId,
    },
  });

  return response;
}
