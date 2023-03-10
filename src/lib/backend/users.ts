import { UserHistorySearch } from '~/data/models/UserHistorySearch';
import { UserHistorySearchItem } from '~/data/models/UserHistorySearchItem';
import { UserPersonalization } from '~/data/models/UserPersonalization';
import { UserPersonalizationUpdate } from '~/data/models/UserPersonalizationUpdate';

import { fetchWithErrorHandling } from '../fetch';

export async function backendCreateUserSession({
  regionId,
  userIp,
}: {
  regionId?: string;
  userIp: string;
}) {
  const response = await fetchWithErrorHandling<
    {
      userPersonalization: UserPersonalization;
      userSessionId: string;
    },
    { regionId?: string; userIp: string }
  >({
    endpoint: '/v1/users/session',
    includeAuthorization: true,
    jsonBody: {
      regionId,
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
  const response = await fetchWithErrorHandling<{
    userPersonalization: UserPersonalization;
  }>({
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
  regionId,
}: { userSessionId: string } & UserPersonalizationUpdate) {
  const response = await fetchWithErrorHandling<
    { userPersonalization: UserPersonalization },
    UserPersonalizationUpdate
  >({
    endpoint: '/v1/users/{userSessionId}/personalization',
    includeAuthorization: true,
    jsonBody: {
      gaClientId,
      userLocationGooglePlacesId,
      userLocationZip,
      regionId,
    },
    method: 'put',
    params: {
      userSessionId,
    },
  });

  return response;
}

export async function backendGetUserSearchHistory(userSessionId: string) {
  return await fetchWithErrorHandling<UserHistorySearch>({
    endpoint: '/v1/users/{userSessionId}/history/search',
    includeAuthorization: true,
    method: 'get',
    params: {
      userSessionId,
    },
  });
}

export async function backendAddUserSearchHistory(
  userSessionId: string,
  item: UserHistorySearchItem,
) {
  return await fetchWithErrorHandling<UserHistorySearch, UserHistorySearchItem>(
    {
      endpoint: '/v1/users/{userSessionId}/history/search',
      includeAuthorization: true,
      jsonBody: item,
      method: 'post',
      params: {
        userSessionId,
      },
    },
  );
}

export async function backendDeleteUserSearchHistory(userSessionId: string) {
  return await fetchWithErrorHandling<null>({
    endpoint: '/v1/users/{userSessionId}/history/search',
    includeAuthorization: true,
    method: 'delete',
    params: {
      userSessionId,
    },
  });
}
