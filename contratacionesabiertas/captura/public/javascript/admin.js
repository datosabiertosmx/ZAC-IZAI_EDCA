//admin
let processing = false;

$("#adminModal").on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var modal = $(this);

    switch (button.data('action')){
        case 'new_user':
            modal.find('.modal-title').text('Registrar usuario');
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load("/admin/new-user.html", function () {
                $(this).find('form').submit(function (e) {
                    $.post('/user', $(this).serialize()).done(function (data) {
                        alert(data.message);
                        if (data.status === 'Ok'){
                            modal.modal('hide');
                        }
                    });
                    e.preventDefault();
                })
            });
            break;

        case 'users':
            modal.find('.modal-title').text('Usuarios');
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load('/admin/users.html',function () {
                modal.on('click', '[data-toggle="modal"]', function () {
                    modal.modal('hide');
                });
            });
            break;
        case 'manage_process':
            modal.find('.modal-title').text('Contrataciones');
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load('/admin/contrataciones.html',function () {
                modal.off('click','#list-contracting .list-group-item');
                modal.on('click','#list-contracting .list-group-item', function () {
                   //alert( $(this).data('contractingprocess_id'));
                    modal.find('#modal_content').html('');
                    modal.find('#modal_content').load('/admin/cp_options.html', {contractingprocess_id : $(this).data('contractingprocess_id')}, function (){
                        $('#update-permissions').submit(function (e) {
                            $.post('/admin/update-permissions/', $(this).serialize()).done(function (data) {
                                alert(data.message);
                                if (data.status === 'Ok'){
                                    modal.modal('hide');
                                }
                            });

                            e.preventDefault();
                        })
                    });
                });

            });
            modal.find('#modal_content').on('submit', '#frmBusquedaContratacion', (e) => {
                e.preventDefault();
                modal.find('#modal_content').load('/admin/contrataciones.html?' + $('#frmBusquedaContratacion').serialize());
            });
            break;
            
        case 'manage_metadata':
            modal.find('.modal-title').text('Licencia y Pólitica de Publicación');
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load('/admin/metadata.html', () => {
                $('#frmMetadata').submit((e) => {
                    e.preventDefault();
                    $.post('/admin/update-metadata', $('#frmMetadata').serializeArray(), (res) => {
                        alert(res.message);
                        if (res.status === 'Ok'){
                            modal.modal('hide');
                        }
                    }).fail(res =>  alert(res.message));
                });
            });
            break;
        case 'manage_catalog':
            modal.find('.modal-title').text(button.data('title'));
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load('/admin/catalog/' + button.data('type')); // funcionalidad en admin_codes.js
            break;
        case 'manage_ocid':
            modal.find('.modal-title').text('Prefijo OCID');
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load('/admin/ocid', () => {
                modal.find('form').submit(function(e) {
                    e.preventDefault();
                    $.post('/admin/ocid', $(this).serializeArray(), (res) => {
                        alert(res.message);
                        modal.modal('hide');
                    }).fail(res =>  alert(res.responseJSON.message));
                });
            });
            break;
        case 'manage_oc4ids':
            modal.find('.modal-title').text('Prefijo OC4IDS');
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load('/admin/oc4ids', () => {
                modal.find('#update_prefix_form').submit(function(e) {
                    e.preventDefault(); 
                    $.post('/admin/oc4ids', $(this).serializeArray(), (res) => {
                        alert(res.message);
                        modal.modal('hide');
                    }).fail(res =>  alert(res.responseJSON.message));
                });
            });
            break;
        case 'validate_proccess':
            modal.find('.modal-dialog').css('width', '80%');
            modal.find('.modal-title').text('Validación de Procesos');
            modal.find('#modal_content').html("");
            modal.find('#modal_content').load('/validate-process/');
            break;
    }
});