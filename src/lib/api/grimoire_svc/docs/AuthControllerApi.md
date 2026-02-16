# AuthControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getMyInfo**](#getmyinfo) | **GET** /api/v1/auth/me | |
|[**login**](#login) | **POST** /api/v1/auth/login | |
|[**refresh**](#refresh) | **GET** /api/v1/auth/refresh | |

# **getMyInfo**
> ApiResponseBodyUserDto getMyInfo()


### Example

```typescript
import {
    AuthControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthControllerApi(configuration);

const { status, data } = await apiInstance.getMyInfo();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseBodyUserDto**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **login**
> ApiResponseBodyLoginResponse login(oauthLoginRequest)


### Example

```typescript
import {
    AuthControllerApi,
    Configuration,
    OauthLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthControllerApi(configuration);

let oauthLoginRequest: OauthLoginRequest; //

const { status, data } = await apiInstance.login(
    oauthLoginRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **oauthLoginRequest** | **OauthLoginRequest**|  | |


### Return type

**ApiResponseBodyLoginResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **refresh**
> ApiResponseBodyLoginResponse refresh()


### Example

```typescript
import {
    AuthControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthControllerApi(configuration);

const { status, data } = await apiInstance.refresh();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ApiResponseBodyLoginResponse**

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

