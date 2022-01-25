<template>
  <q-page class="">
    <div class="container p-0 mx-auto">
      <div class="row mt-10">
        <div class="col-xs-12">
          <div class="q-mx-md intro-cont">
            <h2
              class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 pb-5 pt-10"
            >
              Creating a webpage for a property has never been easier!
            </h2>
            <div>
              <p class="text-body1">
                Have you ever wanted to keep a record of a property listing you
                have seen? Perhaps you want to keep the details available even
                after it is taken down from the listing website.
              </p>
              <p class="text-body1">
                This site lets you create a copy the important details of any
                property listing you come across. You can edit this copy of the
                original listing and share it with your friends or keep it for
                yourself.
              </p>
              <p class="text-body1">
                If you are the owner of the property, you can use this to create
                a much more attractive landing page for it than most estate
                agents can. I know this because I started this project out of my
                own frustration when I tried to sell my flat in the UK:
                <a
                  href="https://medium.com/@weebrix/when-a-hacker-tried-selling-his-home-during-the-corona-lockdown-7b7cb200f7f8"
                  >https://medium.com/@weebrix/when-a-hacker-tried-selling-his-home-during-the-corona-lockdown-7b7cb200f7f8</a
                >
              </p>
              <p class="text-body1">
                For those who are house-hunting this can be a useful tool for
                keeping tabs on different listings.
              </p>
              <p class="text-body1"></p>
              <p class="text-body1"></p>
              <p class="text-body1"></p>
              <p class="text-body1"></p>
            </div>
          </div>
        </div>
        <div class="col-xs-12">
          <RegularSppCreator></RegularSppCreator>
        </div>
        <div class="col-xs-12">
          <LocalSppItems></LocalSppItems>
        </div>
        <div class="col-xs-12">
          <h2
            class="q-pt-xl font-medium text-center title-font text-gray-900"
          >
            FAQ
          </h2>
          <div class="q-mx-md faq-cont">
            <p class="text-h6 text-center">What can I do with this website?</p>
            <p class="text-body1">
              You can create an editable webpage with important information
              about a property that is for sale or for rent.
            </p>
            <p class="text-h6 text-center q-mt-xl">Is my data safe?</p>
            <p class="text-body1">
              Currently (Jan 2022) this is a proof of concept website. It can
              only be used with a demo account and data may get deleted.
            </p>
            <p class="text-body1">
              We advise that once you create a page you like, you copy the html
              and store that on your local device.
            </p>
            <p class="text-h6 text-center q-mt-xl">
              How can I build a site like this?
            </p>
            <p class="text-body1">
              You are in luck. This project has been open sourced and is freely
              available on github here:
              <a
                style=""
                href="https://github.com/etewiah/quasar-singlepropertypages"
                target="_blank"
                rel="noopener"
                >https://github.com/etewiah/quasar-singlepropertypages
              </a>
            </p>
            <p class="text-h6 text-center q-mt-xl">
              What is planned for future releases?
            </p>
            <p class="text-body1">
              Currently the priority is to improve the look and feel.
            </p>
            <p class="text-body1">
              After that we plan to add functionality such as the possiblity to
              export to pdf or to generate a qr code for the page.
            </p>
            <p class="text-body1">
              In the longer term we might enable this to be used as a
              house-hunting kanban board. You will be able to compare multiple
              listings, add private notes and invite people to help you on your
              house hunt.
            </p>
            <p class="text-h6 text-center q-mt-xl">
              What you should not do with this website
            </p>
            <p class="text-body1">
              You are not allowed to pass off listings that do not belong to you
              as your own.
            </p>
            <p class="text-body1">
              If we are made aware of any pages which are created with this tool
              to commit fraud they will be deleted immediately.
            </p>
            <div class="q-pb-lg q-mb-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from "vue"
import RegularSppCreator from "src/components/RegularSppCreator.vue"
import LocalSppItems from "src/components/LocalSppItems.vue"
export default defineComponent({
  name: "SppHomePage",
  components: {
    RegularSppCreator,
    LocalSppItems,
  },
  methods: {},
  props: {},
  computed: {},
  mounted() {},
})
</script>
