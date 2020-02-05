```javascript

@start
@name message
@prefix message
@content
<Message cityId={${cityId}} id={${riderId}} mobile={${mobile}} type={${type}} name={${name}} />
@description dwa-message
@end

@start
@name mobile
@prefix mobile
@content
<Mobile cityId={${cityId}} id={${riderId}} mobile={${mobile}} type={${type}} />
@description mobile
@end

@start
@name notice
@prefix notice
@content
<Notice cityId={${cityId}} id={${riderId}} />
@description notice
@end

```