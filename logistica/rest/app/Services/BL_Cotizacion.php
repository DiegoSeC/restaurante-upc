<?php

namespace App\Services;

use App\Models\DetalleCotizacion;
use App\Repositories\DAO_Cotizacion;
use App\Repositories\DAO_DetalleCotizacion;

class BL_Cotizacion extends Services
{
    private $repository;
    private $detalleRespository;

    public function __construct(DAO_Cotizacion $dao, DAO_DetalleCotizacion $daoDetalle)
    {
        $this->repository = $dao;
        $this->detalleRespository = $daoDetalle;
    }


    public function getCotizaciones($q = null)
    {
        if(isset($q)) {
            return $this->repository->getLikeAll($q);
        }

        return $this->repository->getAll();
    }

    public function getCotizacion($id)
    {
        $cotizacion = $this->repository->getById($id);
        return $this->attachDetalle($cotizacion);
    }

    public function createCotizacion($data)
    {
        $cotizacion = $this->repository->createCotizacion($data);
        $this->detalleRespository->createDetalle($data, $cotizacion->numero);

        return ['success' => true];
    }

    public function updateCotizacion($id, $data)
    {
        $this->repository->updateCotizacion($id, $data);
        $this->detalleRespository->updateDetalle($data);
        return ['success' => true];
    }

    private function attachDetalle($cotizacion)
    {
        $cotizacion->detalle = $this->detalleRespository->findByCotizacion($cotizacion->numero);
        return $cotizacion;
    }

}