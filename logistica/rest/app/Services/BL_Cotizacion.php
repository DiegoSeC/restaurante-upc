<?php

namespace App\Services;

use App\Repositories\DAO_Cotizacion;

class BL_Cotizacion extends Services
{
    private $repository;

    public function __construct(DAO_Cotizacion $dao)
    {
        $this->repository = $dao;
    }


    public function getCotizaciones($q = null)
    {
        if(isset($q)) {
            return $this->repository->getLikeAll($q);
        }

        return $this->repository->getAll();
    }

}