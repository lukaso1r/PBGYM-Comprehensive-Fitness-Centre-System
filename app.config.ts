export default defineAppConfig({
    ui: {
      notifications: {
        // Show toasts at the top right of the screen
        position: 'top-auto bottom-0',
        strategy: 'override',
        
      },
      modal: {
        wrapper: 'relative z-50 bg-black p-30',
        width: 'sm:max-w-[91%] sm:w-auto sm:h-auto '
      }

    }
  })