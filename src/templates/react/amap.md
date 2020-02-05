```javascript

@start
@name amap
@prefix amap
@content
<Map
  id="mapContainer"
  ref={mapRef}
  style={{ height: '400px', display: 'none' }}
  options={{ zoom: 14 }}
  events={{ complete: handleMapComplete }}
/>
@description amap
@end

@start
@name amap-complete
@prefix amap-complete
@content
function handleMapComplete () {
  mapRef?.current.loadAMapPromise.then(() => {
    // todo
  })
}
@description amap
@end

```