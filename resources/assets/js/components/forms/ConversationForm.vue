<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            New message
        </div>
        <div class="panel-body">
            <form action="#" @submit.prevent="send">
                <div class="form-group">                
                   
                    <input type="text" id="users" placeholder="Start typing to find users" class="form-control">
                </div>
                
                <ul v-if="recipients.length" class="list-inline">
                    <li><strong>To:</strong></li>
                    <li v-for="recipient in recipients">{{ recipient.name }} [<a href="#" @click.prevent="removeRecipient(recipient)">x</a>]</li>
                </ul>

                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" cols="30" rows="4" class="form-control" v-model="body"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default">Send</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { userautocomplete } from '../../helpers/autocomplete'

export default {
    data () {
        return {
            body: null,
            recipients: [],
        }
    },
    methods: {
        ...mapActions([
            'createConversation'
            ]),
        addRecipient (recipient) {
            var existing = this.recipients.find((r) => {
                return r.id === recipient.id
            })

            if (typeof existing !== 'undefined') {
                return
            }

            this.recipients.push(recipient)
        },
        removeRecipient (recipient) {
            this.recipients = this.recipients.filter((r) => {
                return r.id !== recipient.id
            })
        },
        send () {
            this.createConversation({
                recipientIds: this.recipients.map((r) => {
                    return r.id
                }),
                body: this.body
            }).then(() => {
                this.recipients = []
                this.body = null
            })
        }
    },
    mounted () {
        var eventSelect;
        var users = userautocomplete('#users').on('autocomplete:selected', (e, selection) => {
            this.addRecipient(selection)
            users.autocomplete.setVal('')
        })

        // $(document).ready(function(){
        //     console.log(11);
        //      eventSelect = $('.select2').select2({
        //         ajax: {
        //             url: '/users',
        //             dataType : 'json',
        //             delay : 200,
        //             data : function(params){
        //                 return {
        //                     q : params.term,
        //                     page : params.page
        //                 };
        //             },
        //             processResults : function(data, params){
        //                 params.page = params.page || 1;
        //                 return {
        //                     results : data.data,
        //                     pagination: {
        //                         more : (params.page  * 10) < data.total
        //                     }
        //                 };
        //             }
        //         },
        //         minimumInputLength : 1,
        //         templateResult : function (repo){
        //             if(repo.loading) return repo.name;
        //             var markup = "<img src="+repo.avatar+" height='20'></img> &nbsp; "+ repo.name;
        //             return markup;
        //         },
        //         templateSelection : function(repo)
        //         {
        //             return repo.name;
        //         },
        //         escapeMarkup : function(markup){ return markup; }


        //     });

        //     eventSelect.on('change', (e) => {
        //         console.log("select2:select", e.params.data); 
        //         // this.addRecipient(e.params.data)
        //         // users.autocomplete.setVal('')
        //     })

        //     // $eventSelect.on("select2:select",  (e) => { 
        //     //     this.addRecipient(e.params.data);
        //     //     // console.log("select2:select", e.params.data); 
        //     //     // console.log("select2:select", selection); 
        //     // });
        // });


    }
}
</script>
