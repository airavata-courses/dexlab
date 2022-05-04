import uvicorn
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from starlette.requests import Request
from fastapi.responses import JSONResponse
import json

from functools import lru_cache
import config
import custosFunc as cf

app = FastAPI()

# ENVIRONMENT VARIABLES


@lru_cache()
def get_settings():
    return config.Settings()



middleware = [Middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], )
]


# EXCEPTION HANDLER
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception:
        return JSONResponse("Internal server error", 500)

app.middleware('http')(catch_exceptions_middleware)


app = FastAPI()
app = FastAPI(middleware=middleware)


@app.get("/")
def custosGateway():
    return 'Welcome to Custos Testing'


@app.post("/verifyUser")
async def verifyUser(info: Request):
    req_data = await info.json()
    print('Printing req data',req_data)
    print(req_data["user_name"])
    print(req_data["admin_password"])
    try:
        resp = await cf.verifiy_user(req_data["user_name"],
                                     req_data["admin_password"])
        print("Successfully verified user")
        return JSONResponse({"success": "true", "message": "Successfully verified user","resp":str(resp)})

    except Exception as e:
        print("verifiy user is not defined or user may not be created  in the teanant" + str(e))
        return JSONResponse({"success": "false"}, 500)


@app.post("/registerUsers")
async def registerUsers(info: Request):
    req_data = await info.json()
    print(req_data)
    try:
        await cf.register_users(req_data['users'])
        return JSONResponse({"success": "true"}, 200)
    except Exception:
        print("please defined method register_users")
        return JSONResponse({"success": "false"}, 500)


@app.post("/createGroups")
async def createGroups(info: Request):
    req_data = await info.json()
    try:
        cf.create_groups(req_data['groups'])
        return JSONResponse({"success": "true"})
    except Exception as e:
        print(e)
        print("please defined method create_groups")
        return JSONResponse({"success": "false"}, 500)


@app.post("/allocateUsersToGroups")
async def allocateUsersToGroups(info: Request):
    req_data = await info.json()
    try:
        resp = cf.allocate_users_to_groups(req_data['user_group_mapping'])
        return JSONResponse(resp)
    except Exception:
        print("please defined method allocate_users_to_groups")
        return JSONResponse({"success": "false"}, 500)


@app.post("/allocateChildToParent")
async def allocateChildToParent(info: Request):
    req_data = await info.json()
    try:
        cf.allocate_child_group_to_parent_group(
            req_data["child_gr_parent_gr_mapping"])
        return JSONResponse({"success": "true"})
    except Exception:
        print("please defined method allocate_child_group_to_parent_group")
        return JSONResponse({"success": "false"}, 500)


@app.post("/createPermission")
async def createPermission(info: Request):
    req_data = await info.json()
    try:
        cf.create_permissions(req_data['permissions'])
        return JSONResponse({"success": "true"})
    except Exception:
        print("please defined method create_permissions")
        return JSONResponse({"success": "false"}, 500)


@app.post("/createEntityType")
async def createEntityType(info: Request):
    req_data = await info.json()
    try:
        cf.create_entity_types(req_data['entity_types'])
        return JSONResponse({"success": "true"})
    except Exception:
        print("please defined method create_entity_types")
        return JSONResponse({"success": "false"}, 500)


@app.post("/registerResources")
async def registerResources(info: Request):
    req_data = await info.json()
    try:
        cf.register_resources(req_data['resources'])
        return JSONResponse({"success": "true"})
    except Exception as e:
        print("Please defined method register_resources", e)
        return JSONResponse({"success": "false"}, 500)


@app.post("/shareResourceWithGroup")
async def shareResourceWithGroup(info: Request):
    req_data = await info.json()
    try:
        cf.share_resource_with_group(req_data['gr_sharings'])
        return JSONResponse({"success": "true"})
    except Exception as e:
        print("please defined method share_resource_with_group")
        return JSONResponse({"success": "false"}, 500)


@app.post("/shareResourceWithUser")
async def shareResourceWithUser(info: Request):
    req_data = await info.json()
    try:
        cf.share_resource_with_user(req_data['sharings'])
        return JSONResponse({"success": "true"})
    except Exception as e:
        print("Please defined method share_resource_with_user")
        return JSONResponse({"success": "false"}, 500)


@app.post("/checkUserPermission")
async def checkUserPermission(info: Request):
    req_data = await info.json()
    try:
        cf.check_user_permissions(req_data['users'])
        return JSONResponse({"success": "true"})
    except Exception as e:
        print(e)
        print("please defined methos check_user_permissions")
        return JSONResponse({"success": "false"}, 500)


@app.post("/createSSH")
async def createSSH(info: Request):
    req_data = await info.json()
    try:
        token = await cf.create_SSH_key(req_data['user_id'], req_data['description'])
        return JSONResponse({"success": "true", "token": token})
        JsonResp = JSONResponse({"success": "true"})
        JsonResp.set_cookie(key="token", value=token)
        return JsonResp
    except Exception as e:
        print(e)


@app.post("/getSSH")
async def getSSH(info: Request):
    req_data = await info.json()
    print(req_data)
    try:
        val = await cf.get_SSH_key(req_data["token"])
        return JSONResponse({"success": "true", "data": val})
    except Exception as e:
        print(e)


def start():
    print('CUSTOS API SERVICE')
    uvicorn.run(app, host="127.0.0.1", port=7000)


if __name__ == '__main__':
    start()