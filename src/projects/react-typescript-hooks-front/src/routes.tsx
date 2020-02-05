import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { Spin } from 'antd'
import RiderDetail from 'pages/detail/index'

const routes = (
  <div className="root-content">
    <Suspense fallback={<Spin className="layout-spinning" />}>
      <Route exact path="/rider/detail/:cityId/:riderId" component={RiderDetail} />
    </Suspense>
  </div>
)
export default routes
