<template>
  <div>
    <div v-html="renderChoices(idx, correctChoicesKey, choices)"></div>
  </div>
</template>

<script>
  export default {
    name: 'Choices',
    props: ['value', 'idx', 'correctChoicesKey', 'choices', 'correctChoices'],
    methods: {
      uid(prefix) {
        if (typeof prefix == "undefined") prefix = "";
        return (
          prefix +
          "xxxxxxxxxxxxx".replace(/[x]/g, function (c) {
            var r = (Math.random() * 16) | 0,
              v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          })
        );
      },

      renderChoices(idx, correctIdx, data) {
        let html = '';
        let swapChoices = Math.floor(Math.random() * Math.floor(2));

        let id_choices = this.uid('choices_');
        let id_correct_choices = this.uid('choices_');

        let currentAnswerList = this.$store.getters.answerList;

        let checked = '';
        let checkedCorrect = '';

        if (currentAnswerList.includes(this.correctChoices)) {
          checkedCorrect = 'checked';
        }
        
        if (currentAnswerList.includes(data)) {
          checked = 'checked';
        }

        if (idx == correctIdx) {
          if (swapChoices) {
            html += '<input id="' + id_choices + '" type="radio" name="selectChoices" value="' + data + '" ' + checked + ' /><label for="' + id_choices + '" class="choices-container">' + data + '</label>';
            html += '<input id="' + id_correct_choices + '" type="radio" name="selectChoices" value="' + this.correctChoices + '" ' + checkedCorrect + ' /><label for="' + id_correct_choices + '" class="choices-container">' + this.correctChoices + '</label>';
          } else {
            html += '<input id="' + id_correct_choices + '" type="radio" name="selectChoices" value="' + this.correctChoices + '" ' + checkedCorrect + ' /><label for="' + id_correct_choices + '" class="choices-container">' + this.correctChoices + '</label>';
            html += '<input id="' + id_choices + '" type="radio" name="selectChoices" value="' + data + '" ' + checked + ' /><label for="' + id_choices + '" class="choices-container">' + data + '</label>';
          }
        } else {
          html += '<input id="' + id_choices + '" type="radio" name="selectChoices" value="' + data + '" ' + checked + ' /><label for="' + id_choices + '" class="choices-container">' + data + '</label>';
        }

        return html;
      }
    },
  }
</script>

<style lang="scss">
  .choices-container {
    display: block;
    border: 1px solid #000;
    border-radius: 3px;
    padding: 10px;
    margin: {
      top: 10px;
    }
    transition: all .3s;
  }

  input[type=radio] {
    display: none;

    &:checked+.choices-container {
      background-color: rgb(200, 200, 200);
    }
  }
  
  p {
    margin: 0;
  }
</style>