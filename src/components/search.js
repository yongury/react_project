<style>
.dropdown.dropdown-lg .dropdown-menu {
    margin-top: -1px;
    padding: 6px 20px;
}
.input-group-btn .btn-group {
    display: flex !important;
}
.btn-group .btn {
    border-radius: 0;
    margin-left: -1px;
}
.btn-group .btn:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
}
.btn-group .form-horizontal .btn[type="submit"] {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.form-horizontal .form-group {
    margin-left: 0;
    margin-right: 0;
}
.form-group .form-control:last-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
}
  @media screen and (min-width: 768px) {
    #adv-search {
        width: 500px;
        margin: 0 auto;
    }
    .dropdown.dropdown-lg {
        position: static !important;
    }
    .dropdown.dropdown-lg .dropdown-menu {
        min-width: 500px;
    }
}
</style>
<div class="container">
	<div class="row">
		<div class="col-md-12">
            <div class="input-group input-group-lg" id="adv-search">
                <input type="text" class="form-control" placeholder="Search properties by city    ex) vancouver" />
                <div class="input-group-btn">
                    <div class="btn-group" role="group">
                        <div class="dropdown dropdown-lg">
                            <button type="button" class="btn btn-default dropdown-toggle btn-lg" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
                            <div class="dropdown-menu dropdown-menu-right" role="menu">
                                <form class="form-horizontal" role="form">
                                    <div class="form-group">
                                    <label for="contain">Price</label>
                                    <input class="form-control" type="number" placeholder="Min Price"/>
                                    <input class="form-control" type="number" placeholder="Max  Price"/>
                                  </div>
                                  <div class="form-group">
                                    <label for="filter">Type</label>
                                    <select class="form-control">
                                          <option>All</option>
                                          <option>House</option>
                                          <option>Condominium</option>
                                    </select>
                                  </div>
                                  <div class="form-group">
                                    <label for="contain">Room</label>
                                    <input type="number" class="form-control" placeholder="Min room number">
                                  </div>
                                    <div class="form-group">
                                    <label for="contain">Bathroom</label>
                                    <input type="number" class="form-control" placeholder="Min bathroom number">
                                  </div>
                            <!--     <button type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button> -->
                                </form>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </div>
                </div>
            </div>
          </div>
        </div>
	</div>
