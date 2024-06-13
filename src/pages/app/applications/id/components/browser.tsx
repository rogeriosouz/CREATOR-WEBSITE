import { useApplicationStore } from '../store/useApplicationStore'

export function Browser() {
  const [outputValue] = useApplicationStore((store) => [store.outputValue])
  return (
    <iframe
      title="output"
      srcDoc={outputValue}
      style={{ width: '100%', height: '100%' }}
      sandbox="allow-scripts"
    />
  )
}
