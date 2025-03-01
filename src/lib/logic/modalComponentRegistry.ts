import SettingsModal from '$lib/components/SettingsModal.svelte'
//@ts-ignore
import type { ModalComponent } from '@skeletonlabs/skeleton/index'

export const modalComponentRegistry: Record<string, ModalComponent> = {
  // Custom Modal 1
  settingsModal: {
    // Pass a reference to your custom component
    ref: SettingsModal,
    // Add the component properties as key/value pairs
    props: {},
    // Provide a template literal for the default component slot
    slot: ''
  }
}
