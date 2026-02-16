# QuestControllerApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**answerQuest**](#answerquest) | **POST** /api/v1/quest/{questId}/answer | Answer Quest|
|[**createQuest**](#createquest) | **POST** /api/v1/quest | Create Quest|
|[**deleteQuest**](#deletequest) | **DELETE** /api/v1/quest/{questId} | Delete Quest|
|[**getQuestList**](#getquestlist) | **POST** /api/v1/quest/list | Get Quest List|
|[**suggestQuest**](#suggestquest) | **POST** /api/v1/quest/suggest | Suggest Quests|

# **answerQuest**
> ApiResponseBodyGradingResult answerQuest(answerQuestRequest)


### Example

```typescript
import {
    QuestControllerApi,
    Configuration,
    AnswerQuestRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestControllerApi(configuration);

let questId: string; // (default to undefined)
let answerQuestRequest: AnswerQuestRequest; //

const { status, data } = await apiInstance.answerQuest(
    questId,
    answerQuestRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **answerQuestRequest** | **AnswerQuestRequest**|  | |
| **questId** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseBodyGradingResult**

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

# **createQuest**
> ApiResponseBodyQuestDTO createQuest(createQuestRequest)


### Example

```typescript
import {
    QuestControllerApi,
    Configuration,
    CreateQuestRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestControllerApi(configuration);

let createQuestRequest: CreateQuestRequest; //

const { status, data } = await apiInstance.createQuest(
    createQuestRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createQuestRequest** | **CreateQuestRequest**|  | |


### Return type

**ApiResponseBodyQuestDTO**

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

# **deleteQuest**
> ApiResponseBodyGradingResult deleteQuest()


### Example

```typescript
import {
    QuestControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestControllerApi(configuration);

let questId: string; // (default to undefined)

const { status, data } = await apiInstance.deleteQuest(
    questId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **questId** | [**string**] |  | defaults to undefined|


### Return type

**ApiResponseBodyGradingResult**

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

# **getQuestList**
> ApiResponseBodyDataListQuestDTO getQuestList(getQuestListRequest)


### Example

```typescript
import {
    QuestControllerApi,
    Configuration,
    GetQuestListRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestControllerApi(configuration);

let getQuestListRequest: GetQuestListRequest; //

const { status, data } = await apiInstance.getQuestList(
    getQuestListRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **getQuestListRequest** | **GetQuestListRequest**|  | |


### Return type

**ApiResponseBodyDataListQuestDTO**

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

# **suggestQuest**
> ApiResponseBodyListQuestDTO suggestQuest(suggestQuestRequest)


### Example

```typescript
import {
    QuestControllerApi,
    Configuration,
    SuggestQuestRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestControllerApi(configuration);

let suggestQuestRequest: SuggestQuestRequest; //

const { status, data } = await apiInstance.suggestQuest(
    suggestQuestRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **suggestQuestRequest** | **SuggestQuestRequest**|  | |


### Return type

**ApiResponseBodyListQuestDTO**

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

