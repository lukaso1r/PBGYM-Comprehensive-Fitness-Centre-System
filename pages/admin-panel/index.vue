<script setup lang="ts">

const store = useLoginStore();

const test = () => {
    console.log('test', store.loggedWorkerData)
}

</script>

<template>
<!-- <UButton @click="test">test</UButton> -->
<workerComponents-header-worker></workerComponents-header-worker>

<div class="flex flex-row bg-[#F5F7F8] items-start pb-10">
  <workerComponents-navabar-worker class="basis-1/5 max-w-[350px] -mt-48 px-6"></workerComponents-navabar-worker>

  <!-- TODO: poprawić margines -->
  <main class="basis-4/5 mt-4 flex flex-row flex-wrap items-start justify-start gap-8">

    <div class="flex flex-row flex-nowrap gap-8">
      <div class="total-entrance-amount flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-3/5 gap-4" style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
        <span class="font-semibold text-lg">Tu będą wykresy ***TODO***</span>
        <img src="/images/twoj-profil/chart.jpg" alt="" srcset="">
        <p>Chyba stąd: <a href="ui.shadcn.com/charts" class="text-blue-800">ui.shadcn.com/charts</a></p>
      </div>

      <div class="total-entrance-amount flex flex-col rounded-lg p-8 bg-[url('/images/worker/aktualizacja.png')] gap-4 basis-2/5 text-white justify-end bg-cover bg-right-bottom " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
        <p class="text-2xl font-semibold drop-shadow-xl">Aktualizacja 10 Paź. 2024</p>
        <p class="drop-shadow-2xl font-medium w-4/5">Zapoznaj się z aktualizacją systemu i wdróż poprawione rozwiązania w twoim obiekcie</p>
      </div>  
    </div>
    
    <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-[31%] gap-4 flex-grow " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
      <span class="font-semibold text-lg">Dokumenty ***TODO***</span>
      <ul class="flex flex-col gap-5 w-full justify-between ">
          <li class="flex flex-row w-full place-items-center">
              <div class="document-name w-full pr-14 flex flex-col gap-1">
                  <h3 class="[word-spacing:5px] font-medium">1 Marzec 2023 - umowa członkowska</h3>
                  <h6 class="font-thin text-slate-500">#MS-415646</h6>
              </div>
              <UButton
                  icon="i-ic-baseline-insert-drive-file"
                  size="sm"
                  color="blue"
                  variant="ghost"
                  label="PDF"
                  :trailing="false"
              />
          </li>
      </ul>
    </div>

    <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-[31%] gap-4 flex-grow " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
      <span class="font-semibold text-lg">Dokumenty ***TODO***</span>
      <ul class="flex flex-col gap-5 w-full justify-between ">
          <li class="flex flex-row w-full place-items-center">
              <div class="document-name w-full pr-14 flex flex-col gap-1">
                  <h3 class="[word-spacing:5px] font-medium">1 Marzec 2023 - umowa członkowska</h3>
                  <h6 class="font-thin text-slate-500">#MS-415646</h6>
              </div>
              <UButton
                  icon="i-ic-baseline-insert-drive-file"
                  size="sm"
                  color="blue"
                  variant="ghost"
                  label="PDF"
                  :trailing="false"
              />
          </li>
      </ul>
    </div>

    <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-[31%] gap-4 flex-grow " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
      <span class="font-semibold text-lg">Dokumenty ***TODO*** LAST</span>
      <ul class="flex flex-col gap-5 w-full justify-between ">
          <li class="flex flex-row w-full place-items-center">
              <div class="document-name w-full pr-14 flex flex-col gap-1">
                  <h3 class="[word-spacing:5px] font-medium">1 Marzec 2023 - umowa członkowska</h3>
                  <h6 class="font-thin text-slate-500">#MS-415646</h6>
              </div>
              <UButton
                  icon="i-ic-baseline-insert-drive-file"
                  size="sm"
                  color="blue"
                  variant="ghost"
                  label="PDF"
                  :trailing="false"
              />
          </li>
      </ul>
    </div>

    <div class="flex flex-row gap-8 basis-full">

      <div class="socialColumn flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start basis-[40%] gap-4 flex-grow " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
        <div>
          <div>Logo nazwa</div>
          <div>button instragram</div>
        </div>
        <hr />
        <p></p>
        <img src="/images/worker/aktualizacja.png" alt="" srcset="">
        <div class="stats">150 like 20 comments</div>
        <hr />
        <div>Komentarze</div>
      </div>

      <div class="IncomeColumn flex flex-col flex-nowrap place-items-start justify-start basis-[60%] gap-4 flex-grow">
        
        <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start w-full gap-4 flex-grow " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
          <span class="font-semibold text-lg">Dokumenty ***TODO***</span>
          <ul class="flex flex-col gap-5 w-full justify-between ">
              <li class="flex flex-row w-full place-items-center">
                  <div class="document-name w-full pr-14 flex flex-col gap-1">
                      <h3 class="[word-spacing:5px] font-medium">1 Marzec 2023 - umowa członkowska</h3>
                      <h6 class="font-thin text-slate-500">#MS-415646</h6>
                  </div>
                  <UButton
                      icon="i-ic-baseline-insert-drive-file"
                      size="sm"
                      color="blue"
                      variant="ghost"
                      label="PDF"
                      :trailing="false"
                  />
              </li>
          </ul>
        </div>

        <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start w-full gap-4 flex-grow " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
          <span class="font-semibold text-lg">Dokumenty ***TODO***</span>
          <ul class="flex flex-col gap-5 w-full justify-between ">
              <li class="flex flex-row w-full place-items-center">
                  <div class="document-name w-full pr-14 flex flex-col gap-1">
                      <h3 class="[word-spacing:5px] font-medium">1 Marzec 2023 - umowa członkowska</h3>
                      <h6 class="font-thin text-slate-500">#MS-415646</h6>
                  </div>
                  <UButton
                      icon="i-ic-baseline-insert-drive-file"
                      size="sm"
                      color="blue"
                      variant="ghost"
                      label="PDF"
                      :trailing="false"
                  />
              </li>
          </ul>
        </div>

        <div class="documents flex flex-col rounded-lg p-4 bg-white flex-nowrap place-items-start justify-start w-full gap-4 flex-grow " style="box-shadow: 0px 0px 24px -8px rgba(66, 68, 90, 1);">
          <span class="font-semibold text-lg">Dokumenty ***TODO***</span>
          <ul class="flex flex-col gap-5 w-full justify-between ">
              <li class="flex flex-row w-full place-items-center">
                  <div class="document-name w-full pr-14 flex flex-col gap-1">
                      <h3 class="[word-spacing:5px] font-medium">1 Marzec 2023 - umowa członkowska</h3>
                      <h6 class="font-thin text-slate-500">#MS-415646</h6>
                  </div>
                  <UButton
                      icon="i-ic-baseline-insert-drive-file"
                      size="sm"
                      color="blue"
                      variant="ghost"
                      label="PDF"
                      :trailing="false"
                  />
              </li>
          </ul>
        </div>

      </div>

    </div>

  </main>

</div>

</template>

<style scoped>



</style>