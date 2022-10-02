with RECURSIVE r as (
	select id, "parentId", name,CAST(name as VARCHAR(100)) as PATH from category
	where id = 1
	
	union 
	select category.id, category."parentId", category.name, CAST(r.PATH || '->' || category.name AS VARCHAR(100)) from category 
	join r on category."parentId" = r.id
)

-- select r.name, r.id, r.path, product.id, product.name from r join product on product."categoryId" = r.id
select * from r