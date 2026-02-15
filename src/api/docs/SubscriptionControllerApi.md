# SubscriptionControllerApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**assignPlan**](#assignplan) | **POST** /api/platform/v1/subscriptions/assign/{schoolId} | |
|[**createPlan**](#createplan) | **POST** /api/platform/v1/subscriptions/plans | |
|[**getActiveSubscription**](#getactivesubscription) | **GET** /api/platform/v1/subscriptions/active/{schoolId} | |
|[**getAllPlans**](#getallplans) | **GET** /api/platform/v1/subscriptions/plans | |

# **assignPlan**
> SchoolSubscription assignPlan()


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

let schoolId: string; // (default to undefined)
let planId: string; // (default to undefined)

const { status, data } = await apiInstance.assignPlan(
    schoolId,
    planId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|
| **planId** | [**string**] |  | defaults to undefined|


### Return type

**SchoolSubscription**

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

# **createPlan**
> SubscriptionPlan createPlan(subscriptionPlan)


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration,
    SubscriptionPlan
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

let subscriptionPlan: SubscriptionPlan; //

const { status, data } = await apiInstance.createPlan(
    subscriptionPlan
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **subscriptionPlan** | **SubscriptionPlan**|  | |


### Return type

**SubscriptionPlan**

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

# **getActiveSubscription**
> SchoolSubscription getActiveSubscription()


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

let schoolId: string; // (default to undefined)

const { status, data } = await apiInstance.getActiveSubscription(
    schoolId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **schoolId** | [**string**] |  | defaults to undefined|


### Return type

**SchoolSubscription**

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

# **getAllPlans**
> Array<SubscriptionPlan> getAllPlans()


### Example

```typescript
import {
    SubscriptionControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SubscriptionControllerApi(configuration);

const { status, data } = await apiInstance.getAllPlans();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<SubscriptionPlan>**

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

