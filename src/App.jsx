import Button from './components/Button'
import Notification from './components/Notification'

import './reset.module.scss'
import './base.module.scss'
import './Button.module.scss'

function App() {
  return (
    <div className="App">
      {/* Button */}
      <Button className="button button__sm" />
      <Button className="button button__sm active" />
      <Button className="button button__md" />
      <Button className="button button__md active" />
      <Button className="button button__lg" />
      <Button className="button button__lg active" />
      <Button className="button button__xl active" />
      <Button className="button button__rectangle__sm" />
      <Button className="button button__rectangle__sm active" />
      <Button className="button button__rectangle__lg" />
      <Button className="button button__rectangle__lg active" />
      <Button className="button linkButton" />

      {/* Notification */}
      <Notification notification="success" />
      <Notification notification="error" />
      <Notification notification="warn" />
      <Notification notification="new" />
    </div>
  )
}

export default App
