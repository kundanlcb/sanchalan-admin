# SupportControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**impersonateUser**](#impersonateuser) | **POST** /api/platform/v1/support/impersonate | |
|[**unlockAccount**](#unlockaccount) | **POST** /api/platform/v1/support/unlock/{userId} | |

# **impersonateUser**
> { [key: string]: string; } impersonateUser()


### Example

```typescript
import {
    SupportControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SupportControllerApi(configuration);

let email: string; // (default to undefined)

const { status, data } = await apiInstance.impersonateUser(
    email
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **email** | [**string**] |  | defaults to undefined|


### Return type

**{ [key: string]: string; }**

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **unlockAccount**
> unlockAccount()


### Example

```typescript
import {
    SupportControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SupportControllerApi(configuration);

let userId: string; // (default to undefined)

const { status, data } = await apiInstance.unlockAccount(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

