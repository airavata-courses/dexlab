

import os
import json
import random
import string

from custos.clients.user_management_client import UserManagementClient
from custos.clients.group_management_client import GroupManagementClient
from custos.clients.resource_secret_management_client import ResourceSecretManagementClient
from custos.clients.sharing_management_client import SharingManagementClient
from custos.clients.identity_management_client import IdentityManagementClient


from custos.transport.settings import CustosServerClientSettings
import custos.clients.utils.utilities as utl

from google.protobuf.json_format import MessageToJson
try:
    # read settings
    custos_settings = CustosServerClientSettings(custos_host='custos.scigap.org',
                                                 custos_port='31499',
                                                 custos_client_id='custos-eelwmskuddvwie206vvy-10003502',
                                                 custos_client_sec='0tOqm7Ohg0HFlg2Z5hiDPlzITBxksUG1ZKUTj1Sf')

# create custos user management client
    user_management_client = UserManagementClient(custos_settings)

# create custos group management client
    group_management_client = GroupManagementClient(custos_settings)

# create custos resource secret client
    resource_secret_client = ResourceSecretManagementClient(custos_settings)

# create sharing management client
    sharing_management_client = SharingManagementClient(custos_settings)

# create identity management client
    identity_management_client = IdentityManagementClient(custos_settings)


# obtain base 64 encoded token for tenant
    b64_encoded_custos_token = utl.get_token(custos_settings=custos_settings)

    created_groups = {}

    admin_user_name = "sbailmar@iu.edu"
    admin_password = "custos@123"

    resource_ids = []
    print("Successfully configured all custos clients")
except Exception as e:
    print("Custos Id and Secret may wrong " + str(e))
    raise e


"""# Sharing usecase
# Verfy  user

*    Get admin user
*  Update admin user profie

"""


async def verifiy_user(login_user_id, login_user_password):
    print("Login user " + login_user_id)
    login_reponse = identity_management_client.token(
        token=b64_encoded_custos_token, username=login_user_id, password=login_user_password, grant_type='password')
    login_reponse = MessageToJson(login_reponse)
    print("Login response: ", login_reponse)
    response = user_management_client.get_user(
        token=b64_encoded_custos_token, username=login_user_id)

    print(" Updating user profile...  ")
    user_management_client.update_user_profile(
        token=b64_encoded_custos_token,
        username=response.username,
        email=response.email,
        first_name=response.first_name,
        last_name=response.last_name)
    print(" User  " + login_user_id +
          " successfully logged in and updated profile")
    return response


print("verifiy_user method is defined")


"""## Register new users

"""


async def register_users(users):
    for user in users:
        print("Registering user: " + user['username'])
        try:
            user_management_client.register_user(token=b64_encoded_custos_token,
                                                 username=user['username'],
                                                 first_name=user['first_name'],
                                                 last_name=user['last_name'],
                                                 password=user['password'],
                                                 email=user['email'],
                                                 is_temp_password=False)
            user_management_client.enable_user(
                token=b64_encoded_custos_token, username=user['username'])
        except Exception:
            print("User may be already exist")


print("register_users method is defined")

users = [
    {
        'username': 'alic',
        'first_name': 'Alic',
        'last_name': 'Aron',
        'password': '12345678',
        'email': 'alice@gmail.com'
    },
    {
        'username': 'audrey',
        'first_name': 'Audrey',
        'last_name': 'Aron',
        'password': '12345678',
        'email': 'audrey@gmail.com'
    },
    {
        'username': 'sophia',
        'first_name': 'Sophia',
        'last_name': 'Aron',
        'password': '12345678',
        'email': 'sophia@gmail.com'
    },
    {
        'username': 'abelota',
        'first_name': 'Abelota',
        'last_name': 'Aron',
        'password': '12345678',
        'email': 'abelota@gmail.com'
    },
    {
        'username': 'abigaill',
        'first_name': 'Abigaill',
        'last_name': 'Aron',
        'password': '12345678',
        'email': 'abigaill@gmail.com'
    },
    {
        'username': 'adalee',
        'first_name': 'Adalee',
        'last_name': 'Aron',
        'password': '12345678',
        'email': 'adalee@gmail.com'
    }
]


"""## Create groups
* Admin group
* Read only admin group
* Gateway users group



"""


def create_groups(groups):
    for group in groups:
        try:
            print("Creating group: " + group['name'])
            grResponse = group_management_client.create_group(token=b64_encoded_custos_token,
                                                              name=group['name'],
                                                              description=group['description'],
                                                              owner_id=group['owner_id'])
            resp = MessageToJson(grResponse)
            print(resp)
            respData = json.loads(resp)
            print("Created group id of " +
                  group['name'] + ": " + respData['id'])
            created_groups[respData['name']] = respData['id']
        except Exception as e:
            print(e)
            print("Group may be already created")


print("create_groups method is defined")

groups = [
    {
        'name': 'Admin',
        'description': 'Group for gateway read only admins',
        'owner_id': admin_user_name
    },
    {
        'name': 'Read Only Admin',
        'description': 'Group for gateway admins',
        'owner_id': admin_user_name
    },
    {
        'name': 'Gateway User',
        'description': 'Group  for gateway users',
        'owner_id': admin_user_name
    }
]

"""## Alocate users to groups

* Admin : alice, audery
* Read only admin : sophia,abelota
* Gateway User :  abgaill, adalee

"""


def allocate_users_to_groups(user_group_mapping):
    for usr_map in user_group_mapping:
        try:
            group_id = created_groups[usr_map['group_name']]
            print("Assigning user " +
                  usr_map['username'] + " to group " + usr_map['group_name'])
            val = group_management_client.add_user_to_group(token=b64_encoded_custos_token,
                                                            username=usr_map['username'],
                                                            group_id=group_id,
                                                            membership_type='Member'
                                                            )
            resp = MessageToJson(val)
            print(resp)
            return resp
        except Exception as e:
            print(e)
            print("User allocation error")


print("allocate_users_to_groups method is defined")

user_group_mapping = [
    {
        'group_name': 'Admin',
        'username': 'alice'
    },
    {
        'group_name': 'Admin',
        'username': 'audrey'
    },
    {
        'group_name': 'Read Only Admin',
        'username': 'sophia'
    },
    {
        'group_name': 'Read Only Admin',
        'username': 'abelota'
    },
    {
        'group_name': 'Gateway User',
        'username': 'abigaill'
    },
    {
        'group_name': 'Gateway User',
        'username': 'adalee'
    }
]


"""## Create group hierarchy
* Assign Admin group as a child of Read Only Admin group
"""


def allocate_child_group_to_parent_group(gr_gr_mapping):
    for gr_map in gr_gr_mapping:
        try:
            child_id = created_groups[gr_map['child_name']]
            parent_id = created_groups[gr_map['parent_name']]
            print("Assigning child group " +
                  gr_map['child_name'] + " to parent group " + gr_map['parent_name'])
            group_management_client.add_child_group(token=b64_encoded_custos_token,
                                                    parent_group_id=parent_id,
                                                    child_group_id=child_id)
        except Exception:
            print("Child group allocation error")


print("allocate_child_group_to_parent_group method is defined")

child_gr_parent_gr_mapping = [
    {
        "child_name": 'Admin',
        "parent_name": 'Read Only Admin'
    }
]


"""## Create Permissions

*   WRITE
* READ


"""


def create_permissions(permissions):
    for perm in permissions:
        print("Creating permission " + perm['id'])
        try:
            sharing_management_client.create_permission_type(token=b64_encoded_custos_token,
                                                             client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                             id=perm['id'],
                                                             name=perm['name'],
                                                             description=perm['description'])
        except Exception:
            print("Permission may be already created")


print("create_permissions method is defined")

permissions = [
    {
        'id': 'READ',
        'name': 'READ',
        'description': 'Read permission'
    },
    {
        'id': 'WRITE',
        'name': 'WRITE',
        'description': 'WRITE permission'
    }
]

"""## Create entity type

Categorization of entities (digital objects) you want to share

*   Project
*   Experiment


"""


def create_entity_types(entity_types):
    for type in entity_types:
        print("Creating entity types " + type['id'])
        try:
            sharing_management_client.create_entity_type(token=b64_encoded_custos_token,
                                                         client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                         id=type['id'],
                                                         name=type['name'],
                                                         description=type['description'])
        except Exception:
            print("Entity type may be already created")


print("create_entity_types method is defined")

entity_types = [
    {
        'id': 'PROJECT',
        'name': 'PROJECT',
        'description': 'PROJECT entity type'
    },
    {
        'id': 'EXPERIMENT',
        'name': 'EXPERIMENT',
        'description': 'EXPERIMENT entity type'
    }
]

"""## Register entity 


*   create an experiment



"""


def register_resources(resources):
    for resource in resources:
        id = resource['name']
        resource_ids.append(id)
        resource['id'] = id
        print("Register resources " +
              resource['name'] + " generated ID : "+resource['id'])
        sharing_management_client.create_entity(token=b64_encoded_custos_token,
                                                client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                id=resource['id'],
                                                name=resource['name'],
                                                description=resource['description'],
                                                owner_id=resource['user_id'],
                                                type=resource['type'],
                                                parent_id='')


print("register_resources method is defined")

resources = [
    {
        'name': 'SEAGRD_EXP',
        'description': 'Register an experiment',
        'user_id': admin_user_name,
        'type': 'EXPERIMENT'
    }
]

"""## Share resource with group


*   Share  experiment under READ permissions with group Read Only Admin



"""


def share_resource_with_group(gr_sharings):
    for shr in gr_sharings:
        try:
            group_id = created_groups[shr['group_name']]
            print("Sharing entity " + shr['entity_id'] + " with group " + shr['group_name'] + " with permission " + shr[
                'permission_type'])
            sharing_management_client.share_entity_with_groups(token=b64_encoded_custos_token,
                                                               client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                               entity_id=shr['entity_id'],
                                                               permission_type=shr['permission_type'],
                                                               group_id=group_id)
        except Exception as e:
            print("Sharing may be already created: " + str(e))


print("share_resource_with_group method is defined")




def share_resource_with_user(sharings):
    for shr in sharings:
        try:
            print("Sharing entity " + shr['entity_id'] + " with user " + shr['user_id'] + " with permission " + shr[
                'permission_type'])
            sharing_management_client.share_entity_with_users(token=b64_encoded_custos_token,
                                                              client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                              entity_id=shr['entity_id'],
                                                              permission_type=shr['permission_type'],
                                                              user_id=shr['user_id']
                                                              )
        except Exception as e:
            print("Sharing error :"+str(e))


print("share_resource_with_user method is defined")


def check_user_permissions(users):
    for user in users:
        try:
            access = sharing_management_client.user_has_access(token=b64_encoded_custos_token,
                                                               client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                               entity_id=resource_ids[0],
                                                               permission_type="READ",
                                                               user_id=user['username'])
            usr = user['username']
            print("Access for user " + usr + " : " + str(access))
        except Exception as e:
            print("Permission checking error " + str(e))


print("check_user_permissions is defined")

"""# Secret Management

# Create SSH Key
"""


def create_SSH_key(user_id, description):
    response = resource_secret_client.add_ssh_credential(token=b64_encoded_custos_token, client_id=custos_settings.CUSTOS_CLIENT_ID,
                                                         owner_id=user_id, description=description)
    return response.token


"""## Fetch SSH Key"""


async def get_SSH_key(token):
    return resource_secret_client.get_ssh_credential(token=b64_encoded_custos_token, client_id=custos_settings.CUSTOS_CLIENT_ID, ssh_credential_token=token)


"""## Run create SSH Key and Fetch SSH key"""

token = create_SSH_key(admin_user_name, 'SSH for gateway')
sharing_management_client.create_entity(token=b64_encoded_custos_token,
                                        client_id=custos_settings.CUSTOS_CLIENT_ID,
                                        id=token,
                                        name='SSH Key',
                                        description='SSH for gateway',
                                        owner_id=admin_user_name,
                                        type='SECRET',
                                        parent_id='')