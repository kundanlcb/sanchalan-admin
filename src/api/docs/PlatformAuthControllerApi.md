# PlatformAuthControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**login**](#login) | **POST** /api/platform/v1/auth/login | |

# **login**
> AuthTokenResponseDto login(loginRequestDto)


### Example

```typescript
import {
    PlatformAuthControllerApi,
    Configuration,
    LoginRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PlatformAuthControllerApi(configuration);

let loginRequestDto: LoginRequestDto; //

const { status, data } = await apiInstance.login(
    loginRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **loginRequestDto** | **LoginRequestDto**|  | |


### Return type

**AuthTokenResponseDto**

### Authorization

[bearer-jwt](../README.md#bearer-jwt)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

