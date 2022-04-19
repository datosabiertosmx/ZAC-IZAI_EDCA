-- Actualizacion de documentos utilizados para el envío a PNT
update public.documenttype set title_esp = 'Convocatoria o invitación' where code = 'tenderNotice';
update public.documenttype set title_esp = 'Estudios de impacto urbano y ambiental' where code = 'environmentalImpact';
update public.documenttype set stage = '0' where code = 'contractText';

-- Ejecutar para actualizar roles con datos en el esquema dashboard
truncate table dashboard.roles restart identity;

insert into dashboard.roles select 
    a.contractingprocess_id,
    a.parties_id,
    a.id,
    a.buyer,
    a.procuringentity,
    a.supplier,
    a.tenderer,
    a.funder,
    a.enquirer,
    a.payer,
    a.payee,
    a.reviewbody,
    a.attendee,
    a.official,
    a.invitedsupplier,
    a.issuingsupplier,
    a.guarantor,
    a.requestingunit,
    a.contractingunit,
    a.technicalunit,
    a.responsibleunit
from public.roles as a
join public.contractingprocess as b on a.contractingprocess_id = b.id
where b.published = true
order by a.id;

-- Ejecutar para crear tablas de project
/*
sequelize db:migrate
sequelize db:seed:all 
*/

-- Ejecutar para eliminar project

/*
sequelize db:migrate:undo:all
*/